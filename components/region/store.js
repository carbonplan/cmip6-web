import create from 'zustand'

export const useRegionStore = create((set) => ({
  showRegionPicker: false,
  openRegionPicker: () => set({ showRegionPicker: true }),
  closeRegionPicker: () => set({ showRegionPicker: false, regionData: {} }),
  regionData: {},
  setRegionData: (key, value) =>
    set(({ regionData }) => {
      return { regionData: { ...regionData, [key]: value } }
    }),
}))
