import { useState } from 'react'
import { useThemeUI } from 'theme-ui'
import { Dimmer } from '@carbonplan/components'
import { Map, Raster, Line, RegionPicker } from '@carbonplan/maps'
import { useColormap } from '@carbonplan/colormaps'

import { useRegionContext } from './region'

const bucket = 'https://storage.googleapis.com/carbonplan-share/'

const MapWrapper = ({ children }) => {
  const { theme } = useThemeUI()
  const [clim, setClim] = useState([-20, 30])
  const [month, setMonth] = useState(1)
  const [band, setBand] = useState('tavg')
  const colormap = useColormap('warm')
  const { showRegionPicker } = useRegionContext()

  return (
    <>
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
        <Raster
          colormap={colormap}
          clim={clim}
          display={true}
          opacity={1}
          mode={'texture'}
          source={bucket + 'maps-demo/4d/tavg-prec-month'}
          variable={'climate'}
          selector={{ month, band }}
        />
        {children}
      </Map>
      <Dimmer
        sx={{
          display: ['initial', 'initial', 'initial', 'initial'],
          position: 'absolute',
          color: 'primary',
          right: [13],
          bottom: [17, 17, 15, 15],
        }}
      />
    </>
  )
}

export default MapWrapper
