import AnimateHeight from 'react-animate-height'
import { useMemo } from 'react'
import { Box } from 'theme-ui'
import { alpha } from '@theme-ui/color'
import { Search, X } from '@carbonplan/icons'

import { useRegionStore } from '../../region'
import { useDatasetsStore } from '../../datasets'
import CustomCheckbox from '../../custom-checkbox'
import Chart from './chart'

const RegionSection = ({ sx }) => {
  const showRegionPicker = useRegionStore((state) => state.showRegionPicker)
  const handleClick = useRegionStore((state) =>
    state.showRegionPicker ? state.closeRegionPicker : state.openRegionPicker
  )
  const regionData = useRegionStore((state) => state.regionData)
  const variable = useDatasetsStore((state) => state.filters?.variable)

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
    content = <Chart data={variableData} />
  } else if (showRegionPicker) {
    content = (
      <Box sx={sx.description}>Select a dataset to view regional data</Box>
    )
  }

  return (
    <Box
      sx={{
        px: [4, 5, 5, 6],
        pt: ['20px'],
        pb: [3],
        cursor: 'pointer',
        pointerEvents: variableData.length > 0 ? 'all' : 'none',
        transition: 'background-color 0.15s',
        '@media (hover: hover) and (pointer: fine)': {
          '&:hover': { bg: alpha('muted', 0.25) },
        },
      }}
      onClick={handleClick}
    >
      <Box
        sx={{
          ...sx.heading,
          mb: [1],
          display: 'flex',
          cursor: 'pointer',

          color: variableData.length > 0 ? 'primary' : 'secondary',
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
        <Box sx={{ pt: [0], pb: [2] }}>
          <Box sx={{ pointerEvents: 'all' }}>{content}</Box>
        </Box>
      </AnimateHeight>
    </Box>
  )
}

export default RegionSection
