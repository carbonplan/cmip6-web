import { Group, Slider } from '@carbonplan/components'
import { Box, Flex } from 'theme-ui'
import { useEffect, useMemo, useRef, useState } from 'react'
import { timeDay } from 'd3-time'

import { useDatasetsStore } from '../../datasets'

class DateStrings {
  constructor(dateStrings) {
    this.dateStrings = dateStrings
    this.length = dateStrings.length
  }

  indexToValues(index) {
    const date = this.dateStrings[index]
    const [year, rawMonth, day] = date.split('-').map(Number)

    return { year, month: rawMonth, day }
  }

  indexToDate(index) {
    const date = this.dateStrings[index]
    const [year, rawMonth, day] = date.split('-').map(Number)

    return new Date(year, rawMonth - 1, day)
  }

  valuesToIndex({ year, month, day }, exact = false) {
    let date = new Date(year, month - 1, day)
    const first = this.indexToDate(0)
    const last = this.indexToDate(this.length - 1)

    if (date < first || date > last) {
      throw new Error('outside range')
    }

    let diff = timeDay.count(first, date)
    let values = this.indexToValues(diff)
    if (year === values.year && month === values.month && day === values.day) {
      return diff
    } else if (exact) {
      return null
    } else {
      let delta = 1
      // TODO: also look forward in time (360 day calendar?)
      while (delta < 5) {
        date = new Date(year, month - 1, day - delta)
        diff = timeDay.count(first, date)
        values = this.indexToValues(diff)

        // use diff if year and month are matching
        if (year === values.year && month === values.month) {
          console.log('approximating', values)
          return diff
        }
        delta++
      }

      console.log(
        'no match',
        delta,
        this.dateStrings[diff],
        `${year}-${month}-${day}`
      )
      return diff
    }
  }

  getYearRange() {
    const { year: firstYear } = this.indexToValues(0)
    const { year: lastYear } = this.indexToValues(this.length - 1)

    return [firstYear, lastYear]
  }

  getMonthRange(index) {
    const { year, month } = this.indexToValues(index)

    let start = 1
    while (
      start <= 12 &&
      typeof this.valuesToIndex({ year, month, day: start }, true) !== 'number'
    ) {
      start++
    }

    let end = 12
    while (
      end > 0 &&
      typeof this.valuesToIndex({ year, month, day: end }, true) !== 'number'
    ) {
      end--
    }

    return [start, end]
  }

  getDayRange(index) {
    const { year, month } = this.indexToValues(index)

    let day = 31
    while (
      day > 0 &&
      typeof this.valuesToIndex({ year, month, day }, true) !== 'number'
    ) {
      day--
    }

    if (!day) {
      throw new Error(
        `End date not found for index: ${index}, date: ${
          this.dateStrings[this.indexToDate]
        }`
      )
    }

    return [1, day]
  }

  getDisplayRange(index) {
    const { year, month } = this.indexToValues(index)
    const [start, end] = this.getDayRange(index)

    return [
      this.valuesToIndex({ year, month, day: start }),
      this.valuesToIndex({ year, month, day: end }),
    ]
  }
}

const Inputs = ({ dateStrings }) => {
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

export default Inputs
