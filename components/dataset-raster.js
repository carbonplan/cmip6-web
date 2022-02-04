import { Raster } from '@carbonplan/maps'
import { useThemedColormap } from '@carbonplan/colormaps'
import shallow from 'zustand/shallow'

import { useDatasetsStore } from './datasets'
import { useRegionStore } from './region'
import { useCallback, useEffect, useMemo } from 'react'

const DatasetRaster = ({ name, index }) => {
  const active = useDatasetsStore((state) => state.active === name)
  const { dateStrings, source, opacity, colormapName, clim, loaded } =
    useDatasetsStore((state) => state.datasets[name], shallow)
  const setLoaded = useDatasetsStore((state) => state.setLoaded)
  const showRegionPicker = useRegionStore((state) => state.showRegionPicker)
  const setRegionData = useRegionStore((state) => state.setRegionData)
  const display = useDatasetsStore((state) => state.displayTime, shallow)
  const setDisplayTime = useDatasetsStore((state) => state.setDisplayTime)
  const colormap = useThemedColormap(colormapName)
  const filters = useDatasetsStore((state) => state.filters)

  const selectedTime = dateStrings?.valuesToTime(display)
  let time = selectedTime
  if (typeof time !== 'number') {
    time = dateStrings?.getNearestTime(display)
  }

  useEffect(() => {
    if (
      active &&
      dateStrings &&
      typeof time === 'number' &&
      typeof selectedTime !== 'number'
    ) {
      const nearestValue = dateStrings.timeToValues(time)
      setDisplayTime(nearestValue)
    }
  }, [active, dateStrings, selectedTime, time])

  const handleLoaded = useCallback(
    (value) => {
      if (!loaded && value) {
        setLoaded(name)
      }
    },
    [name, loaded]
  )

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
      setLoading={handleLoaded}
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
