import { Raster } from '@carbonplan/maps'
import { useThemedColormap } from '@carbonplan/colormaps'
import shallow from 'zustand/shallow'

import { useDatasetsStore } from './datasets'
import { useRegionStore } from './region'
import { useEffect, useMemo } from 'react'

const DatasetRaster = ({ name, index }) => {
  const active = useDatasetsStore((state) => state.active === name)
  const { dateStrings, source, opacity, colormapName, clim } = useDatasetsStore(
    (state) => state.datasets[name],
    shallow
  )
  const showRegionPicker = useRegionStore((state) => state.showRegionPicker)
  const setRegionData = useRegionStore((state) => state.setRegionData)
  const display = useDatasetsStore((state) => state.displayTime, shallow)
  const setDisplayTime = useDatasetsStore((state) => state.setDisplayTime)
  const colormap = useThemedColormap(colormapName)
  const filters = useDatasetsStore((state) => state.filters)

  const time = dateStrings?.valuesToIndex(display, true)

  useEffect(() => {
    if (dateStrings && typeof time !== 'number' && active) {
      const nearestIndex = dateStrings.getNearestIndex(display)
      const nearestValue = dateStrings.indexToValues(nearestIndex)
      setDisplayTime(nearestValue)
    }
  }, [dateStrings, active, time, display])

  const timeRange = useMemo(() => {
    if (!dateStrings) {
      return
    }

    const range = dateStrings.getDisplayRange(display)

    return new Array(range[1] - range[0] + 1)
      .fill(null)
      .map((el, i) => range[0] + i)
  }, [dateStrings, display])

  if (typeof time !== 'number') {
    return null
  }

  return (
    <Raster
      display={active}
      key={filters.variable}
      index={index}
      source={source}
      colormap={colormap}
      clim={clim}
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
