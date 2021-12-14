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

  if (!dateStrings) {
    return 'Loading...'
  }

  const range = [Infinity, -Infinity]
  const lines = data.map(([name, value]) => {
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

  return (
    <Box sx={{ width: '100%', height: '200px' }}>
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
            dateStrings.indexToDate(d).toLocaleString('default', {
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
