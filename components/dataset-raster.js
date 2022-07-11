import { Raster } from '@carbonplan/maps'
import { useThemedColormap } from '@carbonplan/colormaps'
import shallow from 'zustand/shallow'
import { useCallback, useEffect, useMemo } from 'react'

import {
  convertUnits,
  useDatasetsStore,
  DEFAULT_DISPLAY_UNITS,
  NAN,
} from './datasets'
import { useRegionStore } from './region'

const DatasetRaster = ({ name, index }) => {
  const active = useDatasetsStore((state) => state.active === name)
  const { dateStrings, source, colormapName, loaded, units } = useDatasetsStore(
    (state) => state.datasets[name],
    shallow
  )
  const clim = useDatasetsStore(
    (state) => state.clims[state.filters.variable][state.filters.timescale]
  )
  const setLoaded = useDatasetsStore((state) => state.setLoaded)
  const setRegionData = useRegionStore((state) => state.setRegionData)
  const display = useDatasetsStore((state) => state.displayTime, shallow)
  const setDisplayTime = useDatasetsStore((state) => state.setDisplayTime)
  const setDatasetUnits = useDatasetsStore((state) => state.setDatasetUnits)
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
  const setData = useCallback((v) => setRegionData(name, v), [name])

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
      fillValue={NAN}
      clim={
        units
          ? clim.map((d) =>
              convertUnits(d, DEFAULT_DISPLAY_UNITS[filters.variable], units)
            )
          : clim
      }
      mode={'texture'}
      variable={filters.variable}
      selector={{ time }}
      setMetadata={(m) =>
        setDatasetUnits(name, m.metadata[`0/${filters.variable}/.zattrs`].units)
      }
      regionOptions={{
        setData,
        selector: { time: timeRange },
      }}
    />
  )
}

export default DatasetRaster
