import create from 'zustand'

import data from './data.json'
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
      experiment: 'ssp585',
      gcm: {},
      method: {},
    }
  )
}

export const useDatasetsStore = create((set) => ({
  datasets: null,
  fetchDatasets: async () => {
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
        ...getDatasetDisplay(dataset, colors, filters, true),
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
