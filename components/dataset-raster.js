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

  const selectedTime = dateStrings?.valuesToIndex(display)
  let time = selectedTime
  if (typeof time !== 'number') {
    time = dateStrings?.getNearestIndex(display)
  }

  useEffect(() => {
    if (
      active &&
      dateStrings &&
      typeof time === 'number' &&
      typeof selectedTime !== 'number'
    ) {
      const nearestValue = dateStrings.indexToValues(time)
      setDisplayTime(nearestValue)
    }
  }, [active, dateStrings, selectedTime, time])

  const timeRange = useMemo(() => {
    if (!dateStrings) {
      return []
    }
    return dateStrings.getDisplayRange(display)
  }, [dateStrings, display])

  if (timeRange.length === 0) {
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
