import { Group, Slider } from '@carbonplan/components'
import { Box, Flex } from 'theme-ui'
import { useCallback, useEffect, useMemo, useState } from 'react'

import { useTimeStore } from '../../time'

const sx = {
  label: {
    fontFamily: 'mono',
    letterSpacing: 'mono',
    textTransform: 'uppercase',
    fontSize: [1],
  },
}
const TimeSlider = ({
  value,
  range,
  onChange,
  formatLabel,
  formatValue,
  showValue,
  debounce = false,
}) => {
  const [sliding, setSliding] = useState(false)
  const [sliderValue, setSliderValue] = useState(value)
  useEffect(() => {
    if (!sliding && sliderValue !== value) {
      setSliderValue(value)
    }
  }, [sliding, sliderValue, value])

  const handleChange = useCallback(
    (e) => {
      const updatedValue = parseFloat(e.target.value)
      setSliderValue(updatedValue)

      if (!debounce || !sliding) {
        onChange(updatedValue)
      }
    },
    [onChange, debounce, sliding]
  )

  const handleMouseUp = useCallback(() => {
    setSliding(false)
    if (debounce) onChange(sliderValue)
  }, [onChange, sliderValue])

  const handleMouseDown = useCallback(() => {
    setSliding(true)
  }, [onChange, sliderValue])

  let formattedValue = sliderValue
  if (formatValue) {
    formattedValue = formatValue(sliderValue)
  } else if (formatLabel) {
    formattedValue = formatLabel(sliderValue)
  }

  return (
    <Box>
      <Slider
        value={sliderValue}
        min={range[0]}
        max={range[1]}
        step={1}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onChange={handleChange}
      />
      <Flex sx={{ justifyContent: 'space-between' }}>
        <Box sx={sx.label}>
          {formatLabel ? formatLabel(range[0]) : range[0]}
        </Box>
        <Box
          sx={{
            ...sx.label,
            color: sliding ? 'primary' : 'secondary',
            opacity: sliding || showValue ? 1 : 0,
            transition: 'opacity 0.2s, color 0.2s',
          }}
        >
          {formattedValue}
        </Box>
        <Box sx={sx.label}>
          {formatLabel ? formatLabel(range[1]) : range[1]}
        </Box>
      </Flex>
    </Box>
  )
}

const Sliders = () => {
  const dateStrings = useTimeStore((state) => state.dateStrings)

  const setDisplay = useTimeStore((state) => state.setDisplay)
  const setRange = useTimeStore((state) => state.setRange)
  const display = useTimeStore((state) => state.display)

  const [{ year, month, day }, setValues] = useState(() =>
    dateStrings.indexToValues(0)
  )

  const ranges = useMemo(() => {
    return {
      year: dateStrings.getYearRange(),
      month: dateStrings.getMonthRange(display),
      day: dateStrings.getDayRange(display),
    }
  }, [display])

  const onChange = (updates) => {
    const index = dateStrings.getNearestIndex({ year, month, day, ...updates })
    setValues(dateStrings.indexToValues(index))
    setDisplay(index)
    setRange(dateStrings.getDisplayRange(index))
  }

  return (
    <Group>
      <TimeSlider
        value={day}
        range={ranges.day}
        onChange={(value) => onChange({ day: value })}
        formatLabel={(d) =>
          new Date(year, month - 1, d).toLocaleString('default', {
            month: 'short',
            day: 'numeric',
          })
        }
        formatValue={(d) =>
          new Date(year, month - 1, d).toLocaleString('default', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          })
        }
        showValue
      />
      <TimeSlider
        value={month}
        range={ranges.month}
        onChange={(value) => onChange({ month: value })}
        formatLabel={(d) =>
          new Date(year, d - 1, 1).toLocaleString('default', {
            month: 'short',
          })
        }
        debounce
        showValue
      />
      <TimeSlider
        value={year}
        range={ranges.year}
        onChange={(value) => onChange({ year: value })}
        debounce
        showValue
      />
    </Group>
  )
}

export default Sliders
