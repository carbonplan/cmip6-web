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

const SlidersDisabled = () => {
  const timescale = useDatasetsStore((state) => state.filters?.timescale)

  return (
    <Flex sx={{ gap: [2, 2, 2, 3] }}>
      {(timescale === 'day' || !timescale) && <TimeSlider label={'day'} />}
      {(['day', 'month'].includes(timescale) || !timescale) && (
        <TimeSlider label={'month'} />
      )}
      <TimeSlider label={'year'} />
    </Flex>
  )
}

export default SlidersDisabled
