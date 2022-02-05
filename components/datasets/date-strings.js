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

  formatTick(time) {
    const initialTime = this._indexToDate(0)
    const offset = time - this.time[0]

    const date = timeDay.offset(initialTime, offset)
    switch (this.timescale) {
      case 'day':
        return date.toLocaleString('default', {
          month: 'numeric',
          day: 'numeric',
        })
      case 'month':
        return date.toLocaleString('default', {
          month: 'short',
        })
      case 'year':
        return date.toLocaleString('default', {
          year: 'numeric',
        })
      default:
        throw new Error(
          `Unexpected timescale: ${this.timescale}. Expected one of 'day', 'month', 'year`
        )
    }
  }

  timeToValues(time) {
    const index = this.time.indexOf(time)
    return this._indexToValues(index)
  }

  valuesToTime(...args) {
    const index = this._valuesToIndex(...args)
    return this.time[index]
  }

  getNearestTime({ year, month, day }) {
    return this.valuesToTime({ year, month, day }, INEXACT)
  }

  getTicks({ year }) {
    switch (this.timescale) {
      case 'day':
        return null
      case 'month':
        return Array(12)
          .fill(null)
          .map((_, i) => this.valuesToTime({ year, month: i + 1, day: 1 }))
          .filter((index) => typeof index === 'number')
      case 'year':
        const { year: initialYear } = this._indexToValues(0)
        const step = Math.floor(this.time.length / 10)
        return Array(11)
          .fill(null)
          .map((_, i) =>
            this.valuesToTime({
              year: initialYear + step * i,
              month: 1,
              day: 1,
            })
          )
      default:
        throw new Error(
          `Unexpected timescale: ${this.timescale}. Expected one of 'day', 'month', 'year`
        )
    }
  }

  getDisplayRange({ year, month }) {
    switch (this.timescale) {
      case 'day':
        return Array(31)
          .fill(null)
          .map((_, i) => this.valuesToTime({ year, month, day: i + 1 }))
          .filter((index) => typeof index === 'number')
      case 'month':
        return this.getTicks({ year })
      case 'year':
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
