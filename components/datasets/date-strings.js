import { timeDay } from 'd3-time'

const INEXACT = 'INEXACT'
const ALLOW_EMPTY = 'ALLOW_EMPTY'
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

  valuesToIndex({ year, month, day }, mode = ALLOW_EMPTY) {
    let date = new Date(year, month - 1, day)
    const first = this.indexToDate(0)
    const last = this.indexToDate(this.length - 1)

    if (date < first || date > last) {
      switch (mode) {
        case ALLOW_EMPTY:
          return null
        case INEXACT:
          return date < first ? 0 : this.length - 1
        default:
          throw new Error('outside range')
      }
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

    switch (mode) {
      case ALLOW_EMPTY:
        return null
      case INEXACT:
        return diff
      default:
        throw new Error(
          `No exact match found for {year: ${year}, month: ${month}, day: ${day}}, found ${this.dateStrings[diff]} in ${attemptCount} attempts`
        )
    }
  }

  getNearestIndex({ year, month, day }) {
    return this.valuesToIndex({ year, month, day }, INEXACT)
  }

  getDisplayRange({ year, month }) {
    return Array(31)
      .fill(null)
      .map((_, i) => this.valuesToIndex({ year, month, day: i + 1 }))
      .filter((index) => typeof index === 'number')
  }

  getDayRange({ year, month }) {
    const indices = this.getDisplayRange({ year, month })
    const start = indices[0]
    const end = indices[indices.length - 1]

    return [this.indexToValues(start).day, this.indexToValues(end).day]
  }
}
export default DateStrings
