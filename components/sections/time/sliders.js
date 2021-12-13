import { Group, Slider } from '@carbonplan/components'
import { Box, Flex } from 'theme-ui'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import { useDatasetsStore } from '../../datasets'
import DateStrings from './date-strings'

const TimeSlider = ({ value, range, onChange, debounce = false }) => {
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

  const handleBlur = useCallback(() => {
    if (debounce) onChange(sliderValue)
  }, [onChange, sliderValue])

  return (
    <Box>
      <Slider
        value={sliderValue}
        min={range[0]}
        max={range[1]}
        step={1}
        onMouseUp={handleBlur}
        onChange={handleChange}
      />
      <Flex sx={{ justifyContent: 'space-between' }}>
        <Box>{range[0]}</Box>
        <Box>{range[1]}</Box>
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
        debounce
      />
      <TimeSlider value={day} range={ranges.day} onChange={setDay} />
    </Group>
  )
}

export default Sliders
