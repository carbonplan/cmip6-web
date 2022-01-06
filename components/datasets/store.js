import create from 'zustand'
import zarr from 'zarr-js'

import DateStrings from './date-strings'
import { getDatasetDisplay, getFiltersCallback } from './utils'

const DEFAULT_DISPLAY_TIMES = {
  HISTORICAL: { year: 1950, month: 1, day: 1 },
  PROJECTED: { year: 2015, month: 1, day: 1 },
}
const getInitialDatasets = (data) => {
  return data.datasets.reduce((accum, dataset) => {
    accum[dataset.name] = {
      name: dataset.name,
      source: dataset.uri,
      variables: dataset.variables,
      gcm: dataset.gcm,
      method: dataset.method,
      experiment: dataset.experiment,
      timescale: dataset.timescale,
      dateStrings: null,
      selected: false,
      opacity: 1,
      colormapName: null,
      color: null,
      clim: null,
    }
    return accum
  }, {})
}

const getInitialFilters = (data) => {
  return data.datasets.reduce(
    (accum, ds) => {
      accum.gcm[ds.gcm] = true
      accum.method[ds.method] = true
      return accum
    },
    {
      variable: 'tasmax',
      timescale: 'day',
      experiment: 'historical',
      gcm: {},
      method: {},
    }
  )
}

export const useDatasetsStore = create((set, get) => ({
  datasets: null,
  fetchDatasets: async () => {
    const result = await fetch(
      'https://cmip6downscaling.blob.core.windows.net/scratch/cmip6-web-test-8/catalog.json'
    )
    const data = await result.json()

    set({
      datasets: getInitialDatasets(data),
      filters: getInitialFilters(data),
    })
  },
  selectedOrder: [],
  filters: null,
  displayTime: DEFAULT_DISPLAY_TIMES.HISTORICAL,
  updatingTime: false,
  setDisplayTime: (value) => set({ displayTime: value }),
  setUpdatingTime: (value) => set({ updatingTime: value }),

  loadDateStrings: (name) => {
    zarr().load(`${get().datasets[name].source}/0/date_str`, (err, array) => {
      const dateStrings = new DateStrings(Array.from(array.data))
      const { datasets } = get()
      const dataset = datasets[name]
      set({
        datasets: { ...datasets, [name]: { ...dataset, dateStrings } },
      })
    })
  },

  selectDataset: (name) =>
    set(({ datasets, selectedOrder, filters, loadDateStrings }) => {
      const dataset = datasets[name]
      const colors = Object.keys(datasets)
        .map((k) => k !== name && datasets[k].color)
        .filter(Boolean)

      const updatedDataset = {
        ...dataset,
        ...getDatasetDisplay(dataset, colors, filters, true),
        selected: true,
      }

      if (!dataset.dateStrings) {
        loadDateStrings(name)
      }

      return {
        datasets: { ...datasets, [name]: updatedDataset },
        selectedOrder: [name].concat(selectedOrder),
      }
    }),
  setFilters: (value) =>
    set(({ displayTime, filters, datasets, selectedOrder }) => {
      const updatedFilters = { ...filters, ...value }
      const cb = getFiltersCallback(updatedFilters)
      const updatedDatasets = Object.keys(datasets).reduce((accum, k) => {
        const dataset = datasets[k]
        const selected = cb(dataset) && dataset.selected
        let displayUpdates = {}
        if (selected) {
          const colors = Object.keys(accum)
            .map((name) => accum[name].color)
            .filter(Boolean)
          displayUpdates = getDatasetDisplay(
            dataset,
            colors,
            updatedFilters,
            true
          )
        }
        accum[k] = { ...dataset, ...displayUpdates, selected }
        return accum
      }, {})

      let updatedDisplayTime = displayTime
      if (
        (filters.experiment === 'historical') !==
        (updatedFilters.experiment === 'historical')
      ) {
        updatedDisplayTime =
          updatedFilters.experiment === 'historical'
            ? DEFAULT_DISPLAY_TIMES.HISTORICAL
            : DEFAULT_DISPLAY_TIMES.PROJECTED
      }

      return {
        selectedOrder: selectedOrder.filter((n) => updatedDatasets[n].selected),
        datasets: updatedDatasets,
        filters: updatedFilters,
        displayTime: updatedDisplayTime,
      }
    }),

  deselectDataset: (name) =>
    set(({ datasets, selectedOrder }) => {
      const dataset = datasets[name]
      const updatedDataset = {
        ...dataset,
        selected: false,
      }

      return {
        datasets: { ...datasets, [name]: updatedDataset },
        selectedOrder: selectedOrder.filter((n) => n !== dataset.name),
      }
    }),
  updateDatasetDisplay: (name, values) =>
    set(({ datasets, filters }) => {
      const invalidKey = Object.keys(values).find(
        (k) => !['colormapName', 'clim', 'opacity'].includes(k)
      )
      if (invalidKey) {
        throw new Error(
          `Unexpected display update. Invalid key: ${invalidKey}, must be one of 'colormapName', 'clim', 'opacity'`
        )
      }

      const updatedDataset = { ...datasets[name], ...values }
      const colors = Object.keys(datasets)
        .map((k) => k !== name && datasets[k].color)
        .filter(Boolean)

      return {
        datasets: {
          ...datasets,
          [name]: {
            ...updatedDataset,
            ...getDatasetDisplay(updatedDataset, colors, filters),
          },
        },
      }
    }),
}))
