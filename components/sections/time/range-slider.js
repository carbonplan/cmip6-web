import { useCallback } from 'react'
import { Box, Slider } from 'theme-ui'

const RangeSlider = ({ min, max, start, setStart, width, value, step = 1 }) => {
  if (min > max) {
    throw new Error(`Invalid min, max pair: {min: ${min}, max: ${max}}`)
  }

  if (start + width > max) {
    throw new Error(
      `Invalid prop combination: start: ${start}, width: ${width}, max: ${max}`
    )
  }

  const handleChange = useCallback(
    (e) => {
      const rawValue = parseFloat(e.target.value)

      let value = rawValue
      if (rawValue + width > max) {
        value = max - width
      } else if (rawValue < min) {
        value = min
      }
      setStart(value)
    },
    [setStart, width, min, max]
  )

  const thumbWidth = `calc(${width} / (${max} - ${min}) * 100%)`

  return (
    <Box sx={{ position: 'relative' }}>
      <Slider
        sx={{
          bg: 'muted',
          color: 'gray',
          ':focus': {
            outline: 'none',
            color: 'gray',
          },

          '&::-webkit-slider-thumb': {
            width: thumbWidth,
            height: '4px',
            borderRadius: 0,
          },
          '&::-moz-range-thumb': {
            width: thumbWidth,
            height: '4px',
            borderRadius: 0,
          },
        }}
        value={start}
        step={step}
        min={min}
        max={max - width}
        onChange={handleChange}
      />
      <Box
        as='span'
        sx={{
          mt: '-2px',
          bg: 'primary',
          position: 'absolute',
          top: 0,
          left: `calc((${value - min} / ${max - min})  * 100% - 4px)`,
          opacity: 1,
          borderRadius: '8px',
          width: '8px',
          height: '8px',
          zIndex: 1001,
          pointerEvents: 'none',
        }}
      />
    </Box>
  )
}

export default RangeSlider
