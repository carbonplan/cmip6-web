import AnimateHeight from 'react-animate-height'
import { useMemo } from 'react'
import { Box } from 'theme-ui'
import { Search, X } from '@carbonplan/icons'
import { SidebarFooter } from '@carbonplan/layouts'
import { useRegionStore } from '../../region'
import { useDatasetsStore } from '../../datasets'
import Chart from './chart'

const RegionSection = ({ sx }) => {
  const showRegionPicker = useRegionStore((state) => state.showRegionPicker)
  const handleClick = useRegionStore((state) =>
    state.showRegionPicker ? state.closeRegionPicker : state.openRegionPicker
  )
  const regionData = useRegionStore((state) => state.regionData)
  const variable = useDatasetsStore((state) => state.filters?.variable)
  const datasets = useDatasetsStore((state) => state.datasets)

  const variableData = useMemo(
    () =>
      Object.keys(regionData)
        .filter((k) => regionData[k])
        .map((key) => [
          key,
          regionData[key].value ? regionData[key].value[variable] : undefined,
        ]),
    [regionData, variable]
  )

  let content
  if (variableData.length > 0) {
    // render a chart if we have data
    content = <Chart data={variableData} />
  } else {
    // render an empty box with the chart height for a smooth closing animation
    content = <Box sx={{ height: ['200px', '200px', '125px', '200px'] }} />
  }

  const isActive =
    datasets && Object.keys(datasets).some((d) => datasets[d].selected)

  return (
    <SidebarFooter
      sx={{ pointerEvents: isActive ? 'all' : 'none', pt: ['20px'], pb: [3] }}
      onClick={handleClick}
    >
      <Box
        sx={{
          ...sx.heading,
          mb: [1],
          display: 'flex',
          cursor: 'pointer',
          transition: 'color 0.15s',
          opacity: isActive ? 1 : 0.3,
        }}
      >
        <Box key='label' as='span'>
          Regional data
        </Box>
        <Box sx={{ position: 'relative', ml: [2], mt: '-1px' }}>
          {!showRegionPicker && (
            <Search sx={{ strokeWidth: 2, width: '18px' }} />
          )}
          {showRegionPicker && <X sx={{ strokeWidth: 2, width: '18px' }} />}
        </Box>
      </Box>

      <AnimateHeight
        duration={150}
        height={showRegionPicker && variableData.length > 0 ? 'auto' : 0}
        easing={'linear'}
        style={{ pointerEvents: 'none' }}
      >
        <Box sx={{ pt: [1], pb: [2] }}>
          <Box sx={{ pointerEvents: 'all' }}>{content}</Box>
        </Box>
      </AnimateHeight>
    </SidebarFooter>
  )
}

export default RegionSection
