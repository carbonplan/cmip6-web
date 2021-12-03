import { useCallback } from 'react'
import create from 'zustand'
import shallow from 'zustand/shallow'

import data from './data.json'
import { getDatasetDisplay, getFiltersCallback } from './utils'

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
        const selected = cb(dataset) && dataset.selected
        if (selected) {
          const colors = Object.keys(accum)
            .map((name) => accum[name].display.color)
            .filter(Boolean)
          dataset.display = getDatasetDisplay(
            dataset,
            colors,
            value,
            state.filters
          )
        }
        accum[k] = { ...dataset, selected }
        return accum
      }, {})

      return {
        ...state,
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
      const colors = Object.keys(state.datasets)
        .map((k) => k !== name && state.datasets[k].display.color)
        .filter(Boolean)

      dataset.selected = true
      dataset.display = getDatasetDisplay(dataset, colors, state.filters)

      if (!state.selectedOrder.includes(dataset.name)) {
        state.selectedOrder.unshift(dataset.name)
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
  setDatasetDisplay: (name, display) =>
    set((state) => {
      const dataset = state.datasets[name]
      dataset.display = { ...dataset.display, ...display }

      return { ...state }
    }),
}))

export const useSelectedDatasets = () => {
  // TODO: actually meaningfully diff datasets instead of defining new object
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
        reorder: (delta) => state.reorderDataset(name, delta),
        toggleSelection: (selected) => {
          selected ? state.selectDataset(name) : state.deselectDataset(name)
        },
      }),
      [name]
    )
  )
}

export const useDisplay = (name) => {
  const display = useDatasetsStore(
    useCallback((state) => state.datasets[name].display, [name]),
    shallow
  )
  const setDisplay = useDatasetsStore(
    useCallback(
      (state) => (display) => state.setDatasetDisplay(name, display),
      [name]
    )
  )

  return { display, setDisplay }
}
