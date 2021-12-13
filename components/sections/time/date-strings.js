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
export default DateStrings
