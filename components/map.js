import { useState } from 'react'
import { useThemeUI } from 'theme-ui'
import { Map, Line, RegionPicker } from '@carbonplan/maps'

import { useDatasetsStore } from './datasets'
import { useRegionStore } from './region'
import DatasetRaster from './dataset-raster'

const bucket = 'https://storage.googleapis.com/carbonplan-share/'

const MapWrapper = ({ children, setLoading }) => {
  const { theme } = useThemeUI()
  const [month, setMonth] = useState(1)
  const showRegionPicker = useRegionStore((state) => state.showRegionPicker)
  const selectedOrder = useDatasetsStore((state) => state.selectedOrder)

  return (
    <Map zoom={2} center={[0, 0]} debug={false} setLoading={setLoading}>
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
      {selectedOrder
        .slice()
        .reverse()
        .map((name, i) => (
          <DatasetRaster index={i} key={name} name={name} month={month} />
        ))}
      {children}
    </Map>
  )
}

export default MapWrapper
