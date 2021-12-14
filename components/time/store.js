import create from 'zustand'
import zarr from 'zarr-js'

import DateStrings from './date-strings'

export const useTimeStore = create((set) => ({
  display: 0,
  range: [0, 31],
  dateStrings: null,
  loadDateStrings: (source) => {
    zarr().load(`${source}/0/date_str`, (err, array) => {
      set({ dateStrings: new DateStrings(Array.from(array.data)) })
    })
  },
  setDisplay: (value) => set({ display: value }),
  setRange: (value) => set({ range: value }),
}))