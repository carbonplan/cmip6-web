import { useState } from 'react'
import { useThemeUI } from 'theme-ui'
import { Map, Line, RegionPicker } from '@carbonplan/maps'

import { useDatasetsStore } from './datasets'
import { useRegionStore } from './region'
import DatasetRaster from './dataset-raster'

const bucket = 'https://storage.googleapis.com/carbonplan-share/'

const MapWrapper = ({ children, setLoading }) => {
  const { theme } = useThemeUI()
  const showRegionPicker = useRegionStore((state) => state.showRegionPicker)
  const datasets = useDatasetsStore((state) => state.datasets)

  const selectedDatasets = Object.keys(datasets || {}).filter(
    (name) => datasets[name].selected
  )

  return (
    <Map zoom={0} center={[0, 0]} debug={false} setLoading={setLoading}>
      <Line
        color={theme.rawColors.primary}
        source={bucket + 'maps-demo/land'}
        variable={'land'}
      />
      {showRegionPicker && (
        <RegionPicker
          color={theme.colors.primary}
          backgroundColor={theme.colors.background}
          fontFamily={theme.fonts.mono}
          fontSize={'14px'}
          maxRadius={2000}
        />
      )}
      {selectedDatasets.map((name, i) => (
        <DatasetRaster index={i} key={name} name={name} />
      ))}
      {children}
    </Map>
  )
}

export default MapWrapper
