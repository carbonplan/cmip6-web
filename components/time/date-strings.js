import { timeDay } from 'd3-time'

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

  valuesToIndex({ year, month, day }, allowEmpty = false) {
    let date = new Date(year, month - 1, day)
    const first = this.indexToDate(0)
    const last = this.indexToDate(this.length - 1)

    if (date < first || date > last) {
      throw new Error('outside range')
    }

    let diff = Math.min(timeDay.count(first, date), this.length - 1)
    let attemptCount = 0

    while (attemptCount < 5) {
      const values = this.indexToValues(diff)
      if (
        year === values.year &&
        month === values.month &&
        day === values.day
      ) {
        return diff
      }
      const lastAttempt = new Date(values.year, values.month - 1, values.day)
      diff = diff + timeDay.count(lastAttempt, date)
      attemptCount++
    }

    if (allowEmpty) {
      return null
    } else {
      throw new Error(
        `No exact match found for {year: ${year}, month: ${month}, day: ${day}}, found ${this.dateStrings[diff]} in ${attemptCount} attempts`
      )
    }
  }

  getNearestIndex({ year, month, day }) {
    let currentDay = day
    let currentIndex = this.valuesToIndex(
      { year, month, day: currentDay },
      true
    )
    while (currentDay > 0 && typeof currentIndex !== 'number') {
      currentDay--
      currentIndex = this.valuesToIndex({ year, month, day: currentDay }, true)
    }

    if (!currentDay) {
      throw new Error(
        `No nearby index found for {year: ${year}, month: ${month}, day: ${day}}`
      )
    }

    return currentIndex
  }

  getYearRange() {
    const { year: firstYear } = this.indexToValues(0)
    const { year: lastYear } = this.indexToValues(this.length - 1)

    return [firstYear, lastYear]
  }

  getMonthRange(index) {
    const { year } = this.indexToValues(index)

    let start = 1
    while (
      start <= 12 &&
      typeof this.valuesToIndex({ year, month: start, day: 1 }, true) !==
        'number'
    ) {
      start++
    }

    let end = 12
    while (
      end > 0 &&
      typeof this.valuesToIndex({ year, month: end, day: 1 }, true) !== 'number'
    ) {
      end--
    }

    return [start, end]
  }

  getDayRange(index) {
    const { year, month } = this.indexToValues(index)

    const endIndex = this.getNearestIndex({ year, month, day: 31 })
    const { day } = this.indexToValues(endIndex)

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
export default DateStrings
