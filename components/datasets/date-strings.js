import { timeDay, timeMonth, timeYear } from 'd3-time'

const INEXACT = 'INEXACT'
const ALLOW_EMPTY = 'ALLOW_EMPTY'

const TIME_COUNTS = {
  day: timeDay.count,
  month: timeMonth.count,
  year: timeYear.count,
}
class DateStrings {
  constructor(dateStrings, timescale) {
    this.dateStrings = dateStrings
    this.timescale = timescale
    this.length = dateStrings.length
    this.timeCount = TIME_COUNTS[this.timescale]
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

    let diff = Math.min(this.timeCount(first, date), this.length - 1)
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
      diff = diff + this.timeCount(lastAttempt, date)
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
    switch (this.timescale) {
      case 'day':
        return Array(31)
          .fill(null)
          .map((_, i) => this.valuesToIndex({ year, month, day: i + 1 }))
          .filter((index) => typeof index === 'number')
      case 'month':
        return Array(12)
          .fill(null)
          .map((_, i) => this.valuesToIndex({ year, month: i + 1, day: 1 }))
          .filter((index) => typeof index === 'number')
      case 'year':
        // TODO: reconsider whether we should use entire range by default
        return this.dateStrings.map((_, i) => i)
      default:
        throw new Error(
          `Unexpected timescale: ${this.timescale}. Expected one of 'day', 'month', 'year`
        )
    }
  }

  getDayRange({ year, month }) {
    const indices = this.getDisplayRange({ year, month })
    const start = indices[0]
    const end = indices[indices.length - 1]

    return [this.indexToValues(start).day, this.indexToValues(end).day]
  }
}
export default DateStrings
