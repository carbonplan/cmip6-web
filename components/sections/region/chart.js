import { Box } from 'theme-ui'
import { Chart, Circle, Grid, Line, Plot, TickLabels } from '@carbonplan/charts'
import { useDatasetsStore } from '../../datasets'
import { useTimeStore } from '../../time'
import React from 'react'

const getArrayData = (arr) => {
  const { sum, min, max } = arr.reduce(
    (accum, el) => {
      return {
        sum: accum.sum + el,
        min: Math.min(el, accum.min),
        max: Math.max(el, accum.max),
      }
    },
    { sum: 0, min: Infinity, max: -Infinity }
  )
  return { avg: sum / arr.length, min, max }
}

const ChartWrapper = ({ data }) => {
  const datasets = useDatasetsStore((state) => state.datasets)
  const display = useTimeStore((state) => state.display)
  const dateStrings = useTimeStore((state) => state.dateStrings)
  const timeRange = useTimeStore((state) => state.range)

  // We cannot render domain before dateStrings have been loaded, so return generic loading text
  if (!dateStrings) {
    return 'Loading...'
  }

  const range = [Infinity, -Infinity]
  const lines = data
    .filter(([name, value]) => value)
    .map(([name, value]) => {
      let circle
      const lineData = Object.keys(value).map((time) => {
        const { avg, min, max } = getArrayData(value[time])
        range[0] = Math.min(range[0], min)
        range[1] = Math.max(range[1], max)

        let point = [Number(time), avg]
        if (display === point[0]) {
          circle = point
        }
        return point
      })

      return {
        key: name,
        circle,
        color: datasets[name].color,
        lineData,
      }
    })

  const loading = data.some(([name, value]) => !value)

  return (
    <Box sx={{ width: '100%', height: '200px', position: 'relative' }}>
      {loading && (
        <Box
          sx={{
            position: 'absolute',
            top: '30%',
            left: 0,
            right: 0,
            zIndex: 1,
            width: '95px',
            mx: 'auto',
            fontFamily: 'mono',
            letterSpacing: 'mono',
            textTransform: 'uppercase',
          }}
        >
          Loading...
        </Box>
      )}
      <Chart
        x={timeRange}
        y={range}
        padding={{ left: 0, right: 30, top: 0, bottom: 50 }}
      >
        <Grid horizontal vertical />
        <TickLabels right />
        <TickLabels
          bottom
          format={(d) =>
            dateStrings.indexToDate(Math.round(d)).toLocaleString('default', {
              month: 'numeric',
              day: 'numeric',
            })
          }
        />
        <Plot>
          {lines.map(({ key, circle, color, lineData }) => (
            <React.Fragment key={key}>
              <Line color={color} data={lineData} />
              {circle && <Circle x={circle[0]} y={circle[1]} color={color} />}
            </React.Fragment>
          ))}
        </Plot>
      </Chart>
    </Box>
  )
}

export default ChartWrapper
