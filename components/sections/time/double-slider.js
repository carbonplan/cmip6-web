import { useCallback } from 'react'
import { Box, Flex, Slider } from 'theme-ui'

const DoubleSlider = ({
  min,
  max,
  minWidth = 1,
  maxWidth,
  step = 1,
  start,
  end,
  setStart,
  setEnd,
}) => {
  if (min > max) {
    throw new Error(`Invalid min, max pair: {min: ${min}, max: ${max}}`)
  }

  if (maxWidth && minWidth > maxWidth) {
    throw new Error(
      `Invalid minWidth, maxWidth pair: {minWidth: ${minWidth}, maxWidth: ${maxWidth}}`
    )
  }

  const handleStartChange = useCallback(
    (e) => {
      const rawValue = parseFloat(e.target.value)

      let value = rawValue
      if (maxWidth && rawValue < end - maxWidth) {
        value = end - maxWidth
      } else if (rawValue > end - minWidth) {
        value = end - minWidth
      }
      setStart(value)
    },
    [setStart, end, minWidth, maxWidth]
  )

  const handleEndChange = useCallback(
    (e) => {
      const rawValue = parseFloat(e.target.value)

      let value = rawValue
      if (maxWidth && start + maxWidth < rawValue) {
        value = start + maxWidth
      } else if (start + minWidth > rawValue) {
        value = start + minWidth
      }
      setEnd(value)
    },
    [setEnd, start, minWidth, maxWidth]
  )

  return (
    <Box>
      <Box
        sx={{
          position: 'relative',
          height: '20px',
        }}
      >
        <Box
          as='span'
          sx={{
            mt: ['8px'],
            bg: 'primary',
            position: 'absolute',
            top: 0,
            left: `calc(${start} * 100% / ${max - min})`,
            opacity: 1,
            width: `calc(${end - start} * 100% / ${max - min} )`,
            height: '4px',
            zIndex: 1001,
            pointerEvents: 'none',
          }}
        />
        <Slider
          sx={{
            color: 'primary',
            position: 'absolute',
            left: 0,
            top: 0,
            pointerEvents: 'none',
            ':focus': {
              color: 'primary',
              '&::-webkit-slider-thumb': {
                boxShadow: ({ colors }) => `0 0 0 4px ${colors.secondary}`,
              },
              '&::-moz-range-thumb': {
                boxShadow: ({ colors }) => `0 0 0 4px ${colors.secondary}`,
              },
            },
            '&::-webkit-slider-thumb': {
              height: [22, 18, 16],
              width: [22, 18, 16],
              boxShadow: ({ colors }) => `0 0 0 0px ${colors.secondary}`,
              transition: 'box-shadow .15s ease',
              pointerEvents: 'auto',
              zIndex: 1001,
            },
            '&::-moz-range-thumb': {
              height: [22, 18, 16],
              width: [22, 18, 16],
              boxShadow: ({ colors }) => `0 0 0 0px ${colors.secondary}`,
              transition: 'box-shadow .15s ease',
              pointerEvents: 'auto',
              zIndex: 1001,
            },
          }}
          value={start}
          step={step}
          min={min}
          max={max}
          onChange={handleStartChange}
        />
        <Slider
          sx={{
            color: 'primary',
            position: 'absolute',
            left: 0,
            top: 0,
            pointerEvents: 'none',
            bg: 'transparent',
            ':focus': {
              color: 'primary',
              bg: 'transparent',
              '&::-webkit-slider-thumb': {
                boxShadow: ({ colors }) => `0 0 0 4px ${colors.secondary}`,
              },
              '&::-moz-range-thumb': {
                boxShadow: ({ colors }) => `0 0 0 4px ${colors.secondary}`,
              },
            },
            ':focus-visible': {
              outline: 'none !important',
              background: `transparent !important`,
            },
            '&::-webkit-slider-thumb': {
              height: [22, 18, 16],
              width: [22, 18, 16],
              boxShadow: ({ colors }) => `0 0 0 0px ${colors.secondary}`,
              transition: 'box-shadow .15s ease',
              pointerEvents: 'auto',
              zIndex: 1001,
            },
            '&::-moz-range-thumb': {
              height: [22, 18, 16],
              width: [22, 18, 16],
              boxShadow: ({ colors }) => `0 0 0 0px ${colors.secondary}`,
              transition: 'box-shadow .15s ease',
              pointerEvents: 'auto',
              zIndex: 1001,
            },
          }}
          value={end}
          step={step}
          min={min}
          max={max}
          onChange={handleEndChange}
        />
      </Box>
      <Flex sx={{ justifyContent: 'space-between' }}>
        <Box>{min}</Box>
        <Box>{max}</Box>
      </Flex>
    </Box>
  )
}

export default DoubleSlider
