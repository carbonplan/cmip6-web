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
const TimeSlider = ({
  value,
  range,
  onChange,
  formatLabel,
  formatValue,
  showValue,
  debounce = false,
}) => {
  const setUpdatingTime = useDatasetsStore((state) => state.setUpdatingTime)

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
    setUpdatingTime(false)
    if (debounce) onChange(sliderValue)
  }, [onChange, sliderValue, debounce])

  const handleMouseDown = useCallback(() => {
    setSliding(true)
    if (debounce) setUpdatingTime(true)
  }, [onChange, sliderValue, debounce])

  let formattedValue = sliderValue
  if (formatValue) {
    formattedValue = formatValue(sliderValue)
  } else if (formatLabel) {
    formattedValue = formatLabel(sliderValue)
  }

  return (
    <Box sx={{ flex: 1 }}>
      <Slider
        value={sliderValue}
        min={range[0]}
        max={range[1]}
        step={1}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onChange={handleChange}
      />
      <Flex sx={{ justifyContent: 'center' }}>
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
      </Flex>
    </Box>
  )
}

const YEAR_RANGES = {
  HISTORICAL: [1981, 2099],
  PROJECTED: [2020, 2020],
}

const Sliders = ({ dateStrings, historical = false }) => {
  const display = useDatasetsStore((state) => state.displayTime)
  const timescale = useDatasetsStore((state) => state.filters.timescale)
  const { year, month, day } = display
  const setDisplay = useDatasetsStore((state) => state.setDisplayTime)

  const ranges = useMemo(() => {
    return {
      year: historical ? YEAR_RANGES.HISTORICAL : YEAR_RANGES.PROJECTED,
      month: [1, 12],
      day: timescale === 'day' ? dateStrings.getDayRange(display) : [],
    }
  }, [historical, display, dateStrings, timescale])

  const onChange = (updates) => {
    const index = dateStrings.getNearestTime({ year, month, day, ...updates })

    setDisplay(dateStrings.timeToValues(index))
  }

  return (
    <Flex sx={{ gap: [2, 2, 2, 3] }}>
      {timescale === 'day' && (
        <TimeSlider
          value={day}
          range={ranges.day}
          onChange={(value) => onChange({ day: value })}
          formatLabel={(d) =>
            new Date(year, month - 1, d).toLocaleString('default', {
              day: 'numeric',
            })
          }
          showValue
        />
      )}
      {['day', 'month'].includes(timescale) && (
        <TimeSlider
          value={month}
          range={ranges.month}
          onChange={(value) => onChange({ month: value })}
          formatLabel={(d) =>
            new Date(year, d - 1, 1).toLocaleString('default', {
              month: 'short',
            })
          }
          debounce={timescale === 'day'}
          showValue
        />
      )}
      <TimeSlider
        value={year}
        range={ranges.year}
        onChange={(value) => onChange({ year: value })}
        debounce={timescale !== 'year'}
        showValue
      />
    </Flex>
  )
}

export default Sliders
