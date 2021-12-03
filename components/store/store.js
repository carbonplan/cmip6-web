import create from 'zustand'

import data from './data.json'
import { getDatasetDisplay, getFiltersCallback } from './utils'

const getInitialDatasets = () => {
  return data.datasets.reduce((accum, dataset) => {
    accum[dataset.name] = {
      name: dataset.name,
      source: dataset.uri,
      variables: dataset.variables,
      selected: false,
      opacity: 1,
      colormapName: null,
      color: null,
      clim: null,
    }
    return accum
  }, {})
}

export const useDatasetsStore = create((set) => ({
  datasets: getInitialDatasets(),
  selectedOrder: [],
  filters: { variable: 'tavg' },
  selectDataset: (name) =>
    set(({ datasets, selectedOrder, filters }) => {
      // if (!selectedOrder.includes(name)) {
      //   console.log('adding', name, selectedOrder)
      //   selectedOrder.unshift(name)
      //   console.log('added', selectedOrder)
      // }

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
    set(({ datasets, filters, selectedOrder }) => {
      const cb = getFiltersCallback(value)
      const updatedDatasets = Object.keys(datasets).reduce((accum, k) => {
        const dataset = datasets[k]
        const selected = cb(dataset) && dataset.selected
        let displayUpdates = {}
        if (selected) {
          const colors = Object.keys(accum)
            .map((name) => accum[name].color)
            .filter(Boolean)
          displayUpdates = getDatasetDisplay(dataset, colors, value, filters)
        }
        accum[k] = { ...dataset, ...displayUpdates, selected }
        return accum
      }, {})

      console.log(
        'setFilters order',
        selectedOrder.filter((n) => updatedDatasets[n].selected)
      )
      return {
        selectedOrder: selectedOrder.filter((n) => updatedDatasets[n].selected),
        datasets: updatedDatasets,
        filters: value,
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
  updateDataset: (name, values) =>
    set(({ datasets }) => {
      const dataset = datasets[name]

      return { datasets: { ...datasets, [name]: { ...dataset, ...values } } }
    }),
}))
