import { Slider } from '@carbonplan/components'
import { Box, Flex } from 'theme-ui'
import { useCallback, useEffect, useMemo, useState } from 'react'

import { useDatasetsStore } from '../../datasets'

const sx = {
  label: {
    fontFamily: 'mono',
    letterSpacing: 'mono',
    textTransform: 'uppercase',
    fontSize: [1],
  },
}
const TimeSlider = ({ label }) => {
  return (
    <Box sx={{ flex: 1 }}>
      <Slider
        min={0}
        max={1}
        value={0}
        disabled
        sx={{ opacity: 0.25, pointerEvents: 'none' }}
      />
      <Flex sx={{ justifyContent: 'center' }}>
        <Box
          sx={{
            ...sx.label,
            color: 'secondary',
          }}
        >
          {label}
        </Box>
      </Flex>
    </Box>
  )
}

const YEAR_RANGES = {
  HISTORICAL: [1950, 2014],
  PROJECTED: [2015, 2100],
}

const SlidersDisabled = ({ dateStrings, historical = false }) => {
  //const timescale = useDatasetsStore((state) => state.filters.timescale)

  return (
    <Flex sx={{ gap: [2, 2, 2, 3] }}>
      <TimeSlider label={'day'} />
      <TimeSlider label={'month'} />
      <TimeSlider label={'year'} />
    </Flex>
  )
}

export default SlidersDisabled
