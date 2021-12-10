import { Raster } from '@carbonplan/maps'
import { useColormap } from '@carbonplan/colormaps'
import shallow from 'zustand/shallow'

import { useDatasetsStore } from './datasets'
import { useRegionStore } from './region'
import { useMemo } from 'react'

const DatasetRaster = ({ name, index }) => {
  const { source, opacity, colormapName, clim } = useDatasetsStore(
    (state) => state.datasets[name],
    shallow
  )
  const setRegionData = useRegionStore((state) => state.setRegionData)
  const time = useDatasetsStore((state) => state.time)
  const colormap = useColormap(colormapName)
  const filters = useDatasetsStore((state) => state.filters)

  const timeRange = useMemo(
    () =>
      new Array(time.range.max - time.range.min + 1)
        .fill(null)
        .map((el, i) => time.range.min + i),
    [time.range.min, time.range.max]
  )

  return (
    <Raster
      key={filters.variable}
      index={index}
      source={source}
      colormap={colormap}
      clim={clim}
      display={true}
      opacity={opacity}
      mode={'texture'}
      variable={filters.variable}
      selector={{ time: time.display }}
      regionOptions={{
        setData: (v) => setRegionData(name, v),
        selector: { time: timeRange },
      }}
    />
  )
}

export default DatasetRaster
