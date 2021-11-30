import { createContext, useCallback, useContext, useState } from 'react'
import data from './data.json'
import { getFiltersCallback } from './utils'

const DatasetsContext = createContext(null)

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

export const DatasetsProvider = ({ children }) => {
  const [datasets, setDatasets] = useState(getInitialDatasets)
  const [filters, setFilters] = useState({
    variable: 'tavg',
  })

  const handleFiltersChange = (value) => {
    const cb = getFiltersCallback(value)
    const updatedDatasets = Object.keys(datasets).reduce((accum, k) => {
      const dataset = datasets[k]
      accum[k] = { ...dataset, selected: cb(dataset) && dataset.selected }
      return accum
    }, {})

    setDatasets(updatedDatasets)
    setFilters(value)
  }

  return (
    <DatasetsContext.Provider
      value={{
        datasets,
        setDatasets,
        filters,
        setFilters: handleFiltersChange,
      }}
    >
      {children}
    </DatasetsContext.Provider>
  )
}

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
export const useDataset = (name) => {
  const { datasets, setDatasets } = useContext(DatasetsContext)

  if (!datasets[name]) {
    throw new Error(`Dataset ${name} not found`)
  }

  const setSelected = useCallback(
    (value) => {
      const { [name]: dataset, ...rest } = datasets
      if (!dataset.display.colormapName) {
        const color = COLORS[Math.floor(Math.random() * COLORS.length)]
        dataset.display.color = color
        dataset.display.colormapName = `${color}s`
      }

      if (!dataset.display.clim) {
        dataset.display.clim = [-20, 30]
      }

      setDatasets({
        ...rest,
        [name]: { ...dataset, selected: value },
      })
    },
    [name, datasets, setDatasets]
  )

  return { dataset: datasets[name], setSelected }
}

export const useSelectedDatasets = () => {
  const { datasets } = useContext(DatasetsContext)

  return Object.keys(datasets)
    .map((k) => datasets[k])
    .filter((d) => d.selected)
}

export const useFilters = () => {
  const { filters, setFilters } = useContext(DatasetsContext)

  return { filters, setFilters }
}
