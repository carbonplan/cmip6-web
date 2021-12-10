import { Box } from 'theme-ui'
import { Chart, Grid, Line, Plot, TickLabels } from '@carbonplan/charts'
import { useDatasetsStore } from '../../datasets'

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
  const timeRange = useDatasetsStore((state) => state.time.range)
  const variable = useDatasetsStore((state) => state.filters.variable)

  const range = [Infinity, -Infinity]
  const lines = Object.keys(data)
    .filter((key) => data[key].value)
    .map((name) => {
      const value = data[name].value[variable]
      const lineData = Object.keys(value).map((time) => {
        const { avg, min, max } = getArrayData(value[time])
        range[0] = Math.min(range[0], min)
        range[1] = Math.max(range[1], max)
        return [Number(time), avg]
      })

      return {
        key: name,
        color: datasets[name].color,
        data: lineData,
      }
    })

  return (
    <Box sx={{ width: '100%', height: '200px' }}>
      <Chart
        x={[timeRange.min, timeRange.max]}
        y={range}
        padding={{ left: 0, right: 30, top: 0, bottom: 50 }}
      >
        <Grid horizontal vertical />
        <TickLabels right bottom />
        <Plot>
          {lines.map(({ key, ...props }) => (
            <Line key={key} {...props} />
          ))}
        </Plot>
      </Chart>
    </Box>
  )
}

export default ChartWrapper
