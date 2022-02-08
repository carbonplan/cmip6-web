import AnimateHeight from 'react-animate-height'
import { useMemo } from 'react'
import { Box } from 'theme-ui'
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
  } else {
    content = (
      <Box sx={sx.description}>Select a dataset to view regional data</Box>
    )
  }

  return (
    <Box sx={{ my: [4] }}>
      <Box
        sx={{
          ...sx.heading,
          ...(showRegionPicker ? {} : { mb: 0 }),
          display: 'flex',
          justifyContent: 'space-between',
          cursor: 'pointer',
        }}
        onClick={handleClick}
      >
        <Box key='label' as='span'>
          Regional data
        </Box>
        <Box sx={{ position: 'relative' }}>
          <CustomCheckbox
            uncheckedIcon={Search}
            checkedIcon={X}
            checkedHoverIcon={X}
            checked={showRegionPicker}
            onChange={handleClick}
          />
        </Box>
      </Box>

      <AnimateHeight
        duration={150}
        height={showRegionPicker ? 'auto' : 0}
        easing={'linear'}
        style={{ pointerEvents: 'none' }}
      >
        <Box sx={{ pt: [3], pb: [1] }}>
          <Box sx={{ pointerEvents: 'all' }}>{content}</Box>
        </Box>
      </AnimateHeight>
    </Box>
  )
}

export default RegionSection
