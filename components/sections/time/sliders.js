import { DraggableInput, Group, Slider } from '@carbonplan/components'
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

const YEAR_RANGES = {
  HISTORICAL: [1950, 2014],
  PROJECTED: [2015, 2100],
}

const Sliders = ({ dateStrings, historical = false }) => {
  const display = useDatasetsStore((state) => state.displayTime)
  const { year, month, day } = display
  const setDisplay = useDatasetsStore((state) => state.setDisplayTime)

  const ranges = useMemo(() => {
    return {
      year: historical ? YEAR_RANGES.HISTORICAL : YEAR_RANGES.PROJECTED,
      month: [1, 12],
      day: dateStrings.getDayRange(display),
    }
  }, [historical, display, dateStrings])

  const onChange = (updates) => {
    const index = dateStrings.getNearestIndex({ year, month, day, ...updates })

    setDisplay(dateStrings.indexToValues(index))
  }

  return (
    <Group>
      <Group direction='horizontal' spacing={2}>
        <DraggableInput
          value={month}
          setValue={(value) => onChange({ month: value })}
          min={ranges.month[0]}
          max={ranges.month[1]}
          format={(d) =>
            new Date(year, d - 1, 1).toLocaleString('default', {
              month: 'short',
            })
          }
        />
        <Box>
          <DraggableInput
            value={day}
            setValue={(value) => onChange({ day: value })}
            min={ranges.day[0]}
            max={ranges.day[1]}
            sx={{ display: 'inline-block' }}
          />{' '}
          ,
        </Box>
        <DraggableInput
          value={year}
          setValue={(value) => onChange({ year: value })}
          min={ranges.year[0]}
          max={ranges.year[1]}
        />
      </Group>

      <Group direction='horizontal' spacing='sm'>
        <DraggableInput
          value={month}
          setValue={(value) => onChange({ month: value })}
          min={ranges.month[0]}
          max={ranges.month[1]}
        />
        /
        <DraggableInput
          value={day}
          setValue={(value) => onChange({ day: value })}
          min={ranges.day[0]}
          max={ranges.day[1]}
        />
        /
        <DraggableInput
          value={year}
          setValue={(value) => onChange({ year: value })}
          min={ranges.year[0]}
          max={ranges.year[1]}
        />
      </Group>
    </Group>
  )
}

export default Sliders
