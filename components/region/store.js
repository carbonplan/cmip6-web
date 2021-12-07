import create from 'zustand'

export const useRegionStore = create((set) => ({
  showRegionPicker: false,
  setRegionPicker: (value) => set({ showRegionPicker: value }),
  regionData: {},
  setRegionData: (key, value) =>
    set((state) => {
      return {}
    }),
}))
