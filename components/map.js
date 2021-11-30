import { useState } from 'react'
import { useThemeUI } from 'theme-ui'
import { Map, Line, RegionPicker } from '@carbonplan/maps'

import { useSelectedDatasets } from './datasets'
import { useRegionContext } from './region'
import DatasetRaster from './dataset-raster'

const bucket = 'https://storage.googleapis.com/carbonplan-share/'

const MapWrapper = ({ children }) => {
  const { theme } = useThemeUI()
  const [month, setMonth] = useState(1)
  const { showRegionPicker } = useRegionContext()
  const datasets = useSelectedDatasets()

  return (
    <Map zoom={2} center={[0, 0]} debug={false}>
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
      {datasets.map((d) => (
        <DatasetRaster key={d.name} dataset={d} month={month} />
      ))}
      {children}
    </Map>
  )
}

export default MapWrapper
