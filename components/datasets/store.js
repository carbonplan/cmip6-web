import { useCallback } from 'react'
import create from 'zustand'
import shallow from 'zustand/shallow'

import data from './data.json'
import { getFiltersCallback } from './utils'

// TODO:
// - keep track of desired order, use to sort array in useSelectedDatasets
// - smart default selection of display properties
//   - colormap
//   - color (unique value based on colormap?)
//   - clim (based on filters.variable?)

const COLORS = [
  'red',
  'orange',
  'yellow',
  'green',
  'teal',
  'blue',
  'purple',
  'pink',
  'grey',
]

const getInitialDatasets = () => {
  return data.datasets.reduce((accum, dataset) => {
    accum[dataset.name] = {
      name: dataset.name,
      source: dataset.uri,
      variables: dataset.variables,
      selected: false,
      display: { opacity: 1 },
    }
    return accum
  }, {})
}

export const useDatasetsStore = create((set) => ({
  datasets: getInitialDatasets(),
  selectedOrder: [],
  filters: { variable: 'tavg' },
  setFilters: (value) =>
    set((state) => {
      const cb = getFiltersCallback(value)
      const updatedDatasets = Object.keys(state.datasets).reduce((accum, k) => {
        const dataset = state.datasets[k]
        accum[k] = { ...dataset, selected: cb(dataset) && dataset.selected }
        return accum
      }, {})

      return {
        selectedOrder: state.selectedOrder.filter(
          (n) => updatedDatasets[n].selected
        ),
        datasets: updatedDatasets,
        filters: value,
      }
    }),
  selectDataset: (name) =>
    set((state) => {
      const dataset = state.datasets[name]

      dataset.selected = true
      if (!dataset.display.colormapName) {
        const color = COLORS[Math.floor(Math.random() * COLORS.length)]
        dataset.display.color = color
        dataset.display.colormapName = `${color}s`
      }

      if (!dataset.display.clim) {
        dataset.display.clim = [-20, 30]
      }

      if (!state.selectedOrder.includes(dataset.name)) {
        state.selectedOrder.push(dataset.name)
      }

      return { ...state }
    }),
  deselectDataset: (name) =>
    set((state) => {
      const dataset = state.datasets[name]
      dataset.selected = false

      return {
        ...state,
        selectedOrder: state.selectedOrder.filter((n) => n !== dataset.name),
      }
    }),
  reorderDataset: (name, delta) =>
    set((state) => {
      const { selectedOrder } = state
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

      return { ...state }
    }),
}))

export const useSelectedDatasets = () => {
  const { datasets, selectedOrder } = useDatasetsStore((state) => ({
    datasets: state.datasets,
    selectedOrder: state.selectedOrder,
  }))

  return selectedOrder.map((name) => datasets[name])
}

export const useDataset = (name) => {
  return useDatasetsStore(
    useCallback(
      (state) => ({
        dataset: state.datasets[name],
        selectDataset: () => state.selectDataset(name),
        deselectDataset: () => state.deselectDataset(name),
        reorderDataset: (delta) => state.reorderDataset(name, delta),
      }),
      [name]
    )
  )
}
