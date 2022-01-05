import { Raster } from '@carbonplan/maps'
import { useThemedColormap } from '@carbonplan/colormaps'
import shallow from 'zustand/shallow'

import { useDatasetsStore } from './datasets'
import { useTimeStore } from './time'
import { useRegionStore } from './region'
import { useMemo } from 'react'

const DatasetRaster = ({ name, index }) => {
  const { dateStrings, source, opacity, colormapName, clim } = useDatasetsStore(
    (state) => state.datasets[name],
    shallow
  )
  const showRegionPicker = useRegionStore((state) => state.showRegionPicker)
  const setRegionData = useRegionStore((state) => state.setRegionData)
  const display = useTimeStore((state) => state.display, shallow)
  const colormap = useThemedColormap(colormapName)
  const filters = useDatasetsStore((state) => state.filters)

  const timeRange = useMemo(() => {
    if (!dateStrings) {
      return
    }

    const range = dateStrings.getDisplayRange(display)

    return new Array(range[1] - range[0] + 1)
      .fill(null)
      .map((el, i) => range[0] + i)
  }, [dateStrings, display])

  if (!dateStrings) {
    return null
  }

  const time = dateStrings.valuesToIndex(display, true)

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
      selector={{ time }}
      regionOptions={{
        setData: showRegionPicker ? (v) => setRegionData(name, v) : null,
        selector: { time: timeRange },
      }}
    />
  )
}

export default DatasetRaster
