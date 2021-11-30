import { createContext, useCallback, useContext, useState } from 'react'
import data from './data.json'

const DatasetsContext = createContext(null)

const getInitialDatasets = () => {
  return data.datasets.reduce((accum, dataset) => {
    accum[dataset.name] = {
      name: dataset.name,
      selected: false,
      display: {},
    }
    return accum
  }, {})
}

export const DatasetsProvider = ({ children }) => {
  const [datasets, setDatasets] = useState(getInitialDatasets)

  return (
    <DatasetsContext.Provider
      value={{
        datasets,
        setDatasets,
      }}
    >
      {children}
    </DatasetsContext.Provider>
  )
}

export const useDataset = (name) => {
  const { datasets, setDatasets } = useContext(DatasetsContext)

  if (!datasets[name]) {
    throw new Error(`Dataset ${name} not found`)
  }

  const setSelected = useCallback(
    (value) => {
      const { [name]: dataset, ...rest } = datasets

      setDatasets({
        ...rest,
        [name]: { ...dataset, selected: value },
      })
    },
    [name, datasets, setDatasets]
  )

  return { dataset: datasets[name], setSelected }
}
