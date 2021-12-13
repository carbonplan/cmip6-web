import { Group, Slider } from '@carbonplan/components'
import { Box, Flex } from 'theme-ui'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import { useDatasetsStore } from '../../datasets'
import DateStrings from './date-strings'

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
  const handleChange = useCallback(
    (e) => {
      const updatedValue = parseFloat(e.target.value)
      setSliderValue(updatedValue)
      if (!debounce) {
        onChange(updatedValue)
      }
    },
    [onChange, debounce]
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
            opacity: sliding || showValue ? 1 : 0,
            transition: 'opacity 0.2s',
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

const Sliders = ({ dateStrings }) => {
  const ds = useRef(new DateStrings(dateStrings)).current

  const setTime = useDatasetsStore((state) => state.setTime)
  const display = useDatasetsStore((state) => state.time.display)

  const [year, setYear] = useState(() => ds.indexToValues(0).year)
  const [month, setMonth] = useState(() => ds.indexToValues(0).month)
  const [day, setDay] = useState(() => ds.indexToValues(0).day)

  const ranges = useMemo(() => {
    return {
      year: ds.getYearRange(),
      month: ds.getMonthRange(display),
      day: ds.getDayRange(display),
    }
  }, [display])

  useEffect(() => {
    const index = ds.valuesToIndex({ year, month, day })
    setTime({ display: index, range: ds.getDisplayRange(index) })
  }, [year, month, day, ds])

  return (
    <Group>
      <TimeSlider
        value={year}
        range={ranges.year}
        onChange={setYear}
        debounce
      />
      <TimeSlider
        value={month}
        range={ranges.month}
        onChange={setMonth}
        formatLabel={(d) =>
          new Date(year, d - 1, day).toLocaleString('default', {
            month: 'short',
          })
        }
        debounce
      />
      <TimeSlider
        value={day}
        range={ranges.day}
        onChange={setDay}
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
    </Group>
  )
}

export default Sliders
