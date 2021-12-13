import { Group, Slider } from '@carbonplan/components'
import { Box, Flex } from 'theme-ui'
import { useEffect, useMemo, useRef, useState } from 'react'

import { useDatasetsStore } from '../../datasets'
import DateStrings from './date-strings'

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
      <Box>
        <Slider
          value={year}
          min={ranges.year[0]}
          max={ranges.year[1]}
          step={1}
          onChange={(e) => setYear(parseFloat(e.target.value))}
        />
        <Flex sx={{ justifyContent: 'space-between' }}>
          <Box>{ranges.year[0]}</Box>
          <Box>{ranges.year[1]}</Box>
        </Flex>
      </Box>

      <Box>
        <Slider
          value={month}
          min={ranges.month[0]}
          max={ranges.month[1]}
          step={1}
          onChange={(e) => setMonth(parseFloat(e.target.value))}
        />
        <Flex sx={{ justifyContent: 'space-between' }}>
          <Box>{ranges.month[0]}</Box>
          <Box>{ranges.month[1]}</Box>
        </Flex>
      </Box>

      <Box>
        <Slider
          value={day}
          min={ranges.day[0]}
          max={ranges.day[1]}
          step={1}
          onChange={(e) => setDay(parseFloat(e.target.value))}
        />
        <Flex sx={{ justifyContent: 'space-between' }}>
          <Box>{ranges.day[0]}</Box>
          <Box>{ranges.day[1]}</Box>
        </Flex>
      </Box>
    </Group>
  )
}

export default Sliders
