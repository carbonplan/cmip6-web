import create from 'zustand'

export const useTimeStore = create((set) => ({
  display: { year: 1950, month: 1, day: 1 },
  updatingTime: false,
  setDisplay: (value) => set({ display: value }),
  setUpdatingTime: (value) => set({ updatingTime: value }),
}))
