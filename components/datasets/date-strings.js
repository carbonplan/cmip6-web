import { timeDay, timeMonth, timeYear } from 'd3-time'

const INEXACT = 'INEXACT'
const ALLOW_EMPTY = 'ALLOW_EMPTY'

const TIME_COUNTS = {
  day: timeDay.count,
  month: timeMonth.count,
  year: timeYear.count,
}
class DateStrings {
  constructor(dateStrings, time, timescale) {
    this.dateStrings = dateStrings
    this.time = time
    this.timescale = timescale
    this.length = dateStrings.length
    this.timeCount = TIME_COUNTS[this.timescale]
  }

  _indexToValues(index) {
    const date = this.dateStrings[index]
    const [year, rawMonth, day] = date.split('-').map(Number)

    return { year, month: rawMonth, day }
  }

  _indexToDate(index) {
    const date = this.dateStrings[index]
    const [year, rawMonth, day] = date.split('-').map(Number)

    return new Date(year, rawMonth - 1, day)
  }

  _valuesToIndex({ year, month, day }, mode = ALLOW_EMPTY) {
    let date = new Date(year, month - 1, day)
    const first = this._indexToDate(0)
    const last = this._indexToDate(this.length - 1)

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
      const values = this._indexToValues(diff)
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

  timeToValues(time) {
    const index = this.time.indexOf(time)
    return this._indexToValues(index)
  }

  timeToDate(time) {
    const initialTime = this._indexToDate(0)
    const offset = time - this.time[0]
    return timeDay.offset(initialTime, offset)
  }

  valuesToTime(...args) {
    const index = this._valuesToIndex(...args)
    return this.time[index]
  }

  getNearestTime({ year, month, day }) {
    return this.valuesToTime({ year, month, day }, INEXACT)
  }

  getDisplayRange({ year, month }) {
    switch (this.timescale) {
      case 'day':
        return Array(31)
          .fill(null)
          .map((_, i) => this.valuesToTime({ year, month, day: i + 1 }))
          .filter((index) => typeof index === 'number')
      case 'month':
        return Array(12)
          .fill(null)
          .map((_, i) => this.valuesToTime({ year, month: i + 1, day: 1 }))
          .filter((index) => typeof index === 'number')
      case 'year':
        // TODO: reconsider whether we should use entire span of time by default
        return this.time
      default:
        throw new Error(
          `Unexpected timescale: ${this.timescale}. Expected one of 'day', 'month', 'year`
        )
    }
  }

  getDayRange({ year, month }) {
    const times = this.getDisplayRange({ year, month })
    const start = times[0]
    const end = times[times.length - 1]

    return [this._indexToValues(start).day, this._indexToValues(end).day]
  }
}
export default DateStrings
