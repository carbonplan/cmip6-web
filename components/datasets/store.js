import create from 'zustand'

import { getDatasetDisplay, getFiltersCallback } from './utils'

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

export const useDatasetsStore = create((set) => ({
  datasets: null,
  fetchDatasets: async () => {
    const result = await fetch(
      'https://cmip6downscaling.blob.core.windows.net/scratch/cmip6-web-test-7/catalog.json'
    )
    const data = await result.json()

    set({
      datasets: getInitialDatasets(data),
      filters: getInitialFilters(data),
    })
  },
  selectedOrder: [],
  filters: null,
  selectDataset: (name) =>
    set(({ datasets, selectedOrder, filters }) => {
      const dataset = datasets[name]
      const colors = Object.keys(datasets)
        .map((k) => k !== name && datasets[k].color)
        .filter(Boolean)

      const updatedDataset = {
        ...dataset,
        ...getDatasetDisplay(dataset, colors, filters),
        selected: true,
      }

      return {
        datasets: { ...datasets, [name]: updatedDataset },
        selectedOrder: [name].concat(selectedOrder),
      }
    }),
  setFilters: (value) =>
    set(({ filters, datasets, selectedOrder }) => {
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

      return {
        selectedOrder: selectedOrder.filter((n) => updatedDatasets[n].selected),
        datasets: updatedDatasets,
        filters: updatedFilters,
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
  reorderDataset: (name, delta) =>
    set(({ selectedOrder }) => {
      const index = selectedOrder.indexOf(name)
      if (index < 0) {
        throw new Error(
          `Attempted to reorder unexpected dataset, ${name} not found`
        )
      }

      const updatedIndex = Math.min(
        Math.max(0, index + delta),
        selectedOrder.length - 1
      )

      selectedOrder.splice(index, 1)
      selectedOrder.splice(updatedIndex, 0, name)

      return { selectedOrder: [...selectedOrder] }
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
