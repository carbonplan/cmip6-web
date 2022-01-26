import create from 'zustand'
import zarr from 'zarr-js'

import DateStrings from './date-strings'
import { getDatasetDisplay, getFiltersCallback } from './utils'

const DEFAULT_DISPLAY_TIMES = {
  HISTORICAL: { year: 1950, month: 1, day: 1 },
  PROJECTED: { year: 2015, month: 1, day: 1 },
}
const getInitialDatasets = (datasets) => {
  return datasets.reduce((accum, dataset) => {
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
      clim: null,
    }
    return accum
  }, {})
}

const getInitialFilters = (datasets) => {
  return datasets.reduce(
    (accum, ds) => {
      accum.experiment[ds.experiment] = accum.experiment[ds.experiment] || false
      accum.gcm[ds.gcm] = true
      accum.method[ds.method] = true
      return accum
    },
    {
      variable: 'tasmax',
      timescale: 'day',
      experiment: { historical: true },
      gcm: {},
      method: {},
    }
  )
}

export const useDatasetsStore = create((set, get) => ({
  datasets: null,
  active: null,
  filters: null,
  displayTime: DEFAULT_DISPLAY_TIMES.HISTORICAL,
  updatingTime: false,
  loading: [],
  setLoading: () => {
    const key = new Date().getTime()
    set({ loading: [...get().loading, key] })
    return function unsetLoading() {
      set({ loading: get().loading.filter((v) => v !== key) })
    }
  },
  populateDatasets: (catalog) => {
    set({
      datasets: getInitialDatasets(catalog),
      filters: getInitialFilters(catalog),
    })
  },
  setDisplayTime: (value) => set({ displayTime: value }),
  setUpdatingTime: (value) => set({ updatingTime: value }),
  loadDateStrings: (name) => {
    const unsetLoading = get().setLoading()
    zarr().load(`${get().datasets[name].source}/0/date_str`, (err, array) => {
      const dateStrings = new DateStrings(Array.from(array.data))
      const { datasets } = get()
      const dataset = datasets[name]
      set({
        datasets: { ...datasets, [name]: { ...dataset, dateStrings } },
      })
      unsetLoading()
    })
  },
  setActive: (name) =>
    set(({ datasets, selectDataset }) => {
      // ensure that `active` dataset is also `selected`
      if (name && !datasets[name].selected) {
        selectDataset(name)
      }

      return {
        active: name,
      }
    }),
  selectDataset: (name) =>
    set(({ datasets, filters, loadDateStrings }) => {
      const dataset = datasets[name]

      const updatedDataset = {
        ...dataset,
        ...getDatasetDisplay(dataset, filters, true),
        selected: true,
      }

      if (!dataset.dateStrings) {
        loadDateStrings(name)
      }

      return {
        datasets: { ...datasets, [name]: updatedDataset },
      }
    }),
  setFilters: (value) =>
    set(({ active, displayTime, filters, datasets }) => {
      const updatedFilters = { ...filters, ...value }
      const cb = getFiltersCallback(updatedFilters)
      let updatedActive = active
      const updatedDatasets = Object.keys(datasets).reduce((accum, k) => {
        const dataset = datasets[k]
        const visible = cb(dataset)
        let displayUpdates = {}
        if (visible) {
          displayUpdates = getDatasetDisplay(dataset, updatedFilters, true)
        } else if (active === k) {
          updatedActive = null
        }
        accum[k] = {
          ...dataset,
          ...displayUpdates,
          selected: visible && dataset.selected,
        }
        return accum
      }, {})

      let updatedDisplayTime = displayTime
      if (
        filters.experiment.historical !== updatedFilters.experiment.historical
      ) {
        updatedDisplayTime = updatedFilters.experiment.historical
          ? DEFAULT_DISPLAY_TIMES.HISTORICAL
          : DEFAULT_DISPLAY_TIMES.PROJECTED
      }

      return {
        active: updatedActive,
        datasets: updatedDatasets,
        filters: updatedFilters,
        displayTime: updatedDisplayTime,
      }
    }),

  deselectDataset: (name) =>
    set(({ active, datasets }) => {
      const dataset = datasets[name]
      const updatedDataset = {
        ...dataset,
        selected: false,
      }

      return {
        active: active === name ? null : active,
        datasets: { ...datasets, [name]: updatedDataset },
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

      return {
        datasets: {
          ...datasets,
          [name]: {
            ...updatedDataset,
            ...getDatasetDisplay(updatedDataset, filters),
          },
        },
      }
    }),
}))
