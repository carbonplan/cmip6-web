import { Raster } from '@carbonplan/maps'
import { useColormap } from '@carbonplan/colormaps'
import shallow from 'zustand/shallow'

import { useDatasetsStore } from './store'

const DatasetRaster = ({ name, month, index }) => {
  const dataset = useDatasetsStore((state) => state.datasets[name], shallow)
  const { source, variables, opacity, colormapName, clim } = dataset
  const colormap = useColormap(colormapName)
  const filters = useDatasetsStore((state) => state.filters)

  // TODO: remove logic and just use variable={filters.variable} with real datasets
  let variable = filters.variable
  const selector = { month }
  if (variables.length > 1) {
    variable = 'climate'
    selector.band = filters.variable
  }

  return (
    <Raster
      index={index}
      source={source}
      colormap={colormap}
      clim={clim}
      display={true}
      opacity={opacity}
      mode={'texture'}
      variable={variable}
      selector={selector}
    />
  )
}

export default DatasetRaster
