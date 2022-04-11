import { Box, Spinner } from 'theme-ui'
import React, { useMemo, useState } from 'react'
import { format } from 'd3-format'
import {
  Chart,
  Circle,
  Grid,
  Line,
  Plot,
  Rect,
  TickLabels,
} from '@carbonplan/charts'
import { useRegion } from '@carbonplan/maps'

import { COLORMAP_COLORS, useDatasetsStore } from '../../datasets'

const degToRad = (degrees) => {
  return degrees * (Math.PI / 180)
}

const areaOfPixelProjected = (lat, zoom) => {
  const c = 40075016.686 / 1000
  return Math.pow(
    (c * Math.cos(degToRad(lat))) / Math.pow(2, Math.floor(zoom) + 7),
    2
  )
}

const getArrayData = (arr, lats, zoom) => {
  const areas = lats.map((lat) => areaOfPixelProjected(lat, zoom))
  const totalArea = areas.reduce((a, d) => a + d, 0)
  return arr.reduce(
    (accum, el, i) => ({
      avg: accum.avg + el * (areas[i] / totalArea),
      min: Math.min(el, accum.min),
      max: Math.max(el, accum.max),
    }),
    { avg: 0, min: Infinity, max: -Infinity }
  )
}

export const formatValue = (value) => {
  let result
  if (value === 0) {
    result = 0
  } else if (value < 0.0001) {
    result = format('.0e')(value)
  } else if (value < 0.01) {
    result = format('.2')(value)
  } else if (value < 1) {
    result = format('.2f')(value)
  } else if (value < 10) {
    result = format('.1f')(value)
  } else if (value < 10000) {
    result = format('.0f')(value)
  } else {
    result = format('0.2s')(value)
  }

  return (
    <Box as='span' sx={{ whiteSpace: 'nowrap' }}>
      {result}
    </Box>
  )
}

const LoadingSpinner = ({ opacity = 1 }) => {
  return (
    <Box
      sx={{
        position: 'absolute',
        top: '25%',
        left: '35px',
        right: 0,
        zIndex: 1,
        width: '28px',
        mx: 'auto',
        opacity: opacity,
        transition: 'opacity 0.05s',
      }}
    >
      <Spinner sx={{ color: 'secondary' }} duration={750} size={28} />
    </Box>
  )
}

const ChartWrapper = ({ data }) => {
  const [hovered, setHovered] = useState(null)
  const activeDataset = useDatasetsStore((state) => state.active)
  const hoveredDataset = useDatasetsStore((state) => state.hovered)
  const datasets = useDatasetsStore((state) => state.datasets)
  const display = useDatasetsStore((state) => state.displayTime)
  const setDisplay = useDatasetsStore((state) => state.setDisplayTime)
  const { region } = useRegion()
  const zoom = region?.properties?.zoom || 0

  // By default, use active dataset as primary dataset (reference for dateStrings and timescale)
  let primaryDataset = datasets[activeDataset]
  if (!primaryDataset) {
    // But fallback to first selected dataset if none is active
    const selectedName = Object.keys(datasets).find(
      (key) => datasets[key].selected
    )
    primaryDataset = datasets[selectedName]
  }

  const { dateStrings, timescale, displayUnits, unitsConverter } =
    primaryDataset
  const { timeRange, ticks, bands } = useMemo(() => {
    if (!dateStrings) {
      return {}
    }
    const fullRange = dateStrings.getDisplayRange(display)
    const bands = fullRange.map((d, i) => ({
      time: d,
      x0: i === 0 ? d : (fullRange[i - 1] + d) / 2,
      x1: i === fullRange.length - 1 ? d : (d + fullRange[i + 1]) / 2,
    }))

    return {
      timeRange: [fullRange[0], fullRange[fullRange.length - 1]],
      ticks: dateStrings.getTicks(display),
      bands,
    }
  }, [dateStrings, display])

  // We cannot render domain before dateStrings have been loaded, so return generic loading text
  if (!datasets || !dateStrings || !unitsConverter) {
    return (
      <Box
        sx={{
          width: '100%',
          height: ['200px', '200px', '125px', '200px'],
          position: 'relative',
        }}
      >
        <LoadingSpinner />
      </Box>
    )
  }

  let circle
  const range = [Infinity, -Infinity]

  const lines = data
    .filter(([name, value, lats]) => value && lats && datasets[name].selected)
    .map(([name, value, lats]) => {
      const lineData = Object.keys(value)
        .map((time) => {
          const { avg, min, max } = getArrayData(value[time], lats, zoom)
          range[0] = Math.min(range[0], min)
          range[1] = Math.max(range[1], max)

          const activeTime = dateStrings.valuesToTime(
            datasets[name].dateStrings.timeToValues(Number(time))
          )

          if (name === activeDataset && hovered === activeTime) {
            circle = [activeTime, avg]
          }

          return [activeTime, avg]
        })
        .filter((p) => typeof p[0] === 'number')

      let color = 'secondary'
      let width = 1.5
      const activeColor = COLORMAP_COLORS[datasets[name].colormapName]

      if (name === activeDataset) {
        color = activeColor
        width = 2
      } else if (name === hoveredDataset) {
        color = 'primary'
        width = 2
      }
      return {
        key: name,
        circle,
        color,
        width,
        lineData,
      }
    }, [])

  const loading = data.some(([name, value]) => !value)

  return (
    <Box
      sx={{
        width: '100%',
        height: ['200px', '200px', '125px', '200px'],
        position: 'relative',
      }}
      onClick={(e) => {
        e.stopPropagation()
      }}
    >
      <LoadingSpinner opacity={loading ? 1 : 0} />
      <Chart
        x={timeRange}
        y={range.map((d) => unitsConverter.display(d))}
        padding={{ left: 35, right: 0, top: 0, bottom: 25 }}
      >
        <Grid horizontal />
        <Grid vertical values={timescale === 'day' ? undefined : ticks} />
        <TickLabels left count={4} format={formatValue} />
        <TickLabels
          bottom
          values={timescale === 'day' ? undefined : ticks}
          format={(d) => dateStrings.formatTick(Math.round(d))}
        />
        {typeof hovered === 'number' && circle && (
          <Box
            sx={{
              position: 'absolute',
              right: 0,
              top: 0,
              mt: 0,
            }}
          >
            <Box
              sx={{
                fontFamily: 'mono',
                letterSpacing: 'mono',
                textTransform: 'uppercase',
                fontSize: [1, 1, 1, 2],
                color: 'secondary',
              }}
            >
              ({dateStrings.formatTick(circle[0])},{' '}
              {formatValue(unitsConverter.display(circle[1]))}
              <Box as='span' sx={{ textTransform: 'none' }}>
                {displayUnits}
              </Box>
              )
            </Box>
          </Box>
        )}

        <Plot>
          {!loading &&
            lines
              .sort((a, b) => {
                const [aWeight, bWeight] = [a, b].map(({ key }) => {
                  if (key === hoveredDataset) {
                    return 2
                  } else if (key === activeDataset) {
                    return 1
                  } else {
                    return 0
                  }
                })

                return aWeight - bWeight
              })
              .map(({ key, circle, color, width, lineData }) => (
                <Box as='g' key={key}>
                  <Line
                    color={color}
                    data={lineData.map(([x, y]) => [
                      x,
                      unitsConverter.display(y),
                    ])}
                    width={width}
                    sx={{ transition: 'all 0.2s' }}
                  />
                  {circle && (
                    <Circle
                      x={circle[0]}
                      y={unitsConverter.display(circle[1])}
                      color={color}
                      size={15}
                    />
                  )}
                </Box>
              ))}
          {!loading &&
            bands.map(({ time, x0, x1 }) => (
              <Rect
                key={time}
                x={[x0, x1]}
                y={range.map((d) => unitsConverter.display(d))}
                color='transparent'
                onMouseEnter={() => setHovered(time)}
                onMouseLeave={() => setHovered(null)}
                onClick={() => setDisplay(dateStrings.timeToValues(time))}
              />
            ))}
        </Plot>
      </Chart>
    </Box>
  )
}

export default ChartWrapper
