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

  getDayRange({ year, month }) {
    const endIndex = this.getNearestIndex({ year, month, day: 31 })
    const { day } = this.indexToValues(endIndex)

    return [1, day]
  }

  getDisplayRange({ year, month }) {
    const [start, end] = this.getDayRange({ year, month })

    return [
      this.valuesToIndex({ year, month, day: start }),
      this.valuesToIndex({ year, month, day: end }),
    ]
  }
}
export default DateStrings
