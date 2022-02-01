import create from 'zustand'
import zarr from 'zarr-js'

import DateStrings from './date-strings'

export const useDateStringsStore = create((set) => ({
  dateStrings: {},
  loadDateStrings: (name, source) => {
    set((prev) => ({ dateStrings: { ...prev.dateStrings, [name]: null } }))

    zarr().load(`${source}/0/date_str`, (err, array) => {
      const dateStrings = new DateStrings(Array.from(array.data))

      set((prev) => ({
        dateStrings: {
          ...prev.dateStrings,
          [name]: dateStrings,
        },
      }))
    })
  },
}))
