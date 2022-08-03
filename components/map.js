import { useThemeUI } from 'theme-ui'
import { Fill, Map, Line, RegionPicker, useMapbox } from '@carbonplan/maps'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import { useDatasetsStore } from './datasets'
import { useRegionStore } from './region'
import DatasetRaster from './dataset-raster'

const bucket = 'https://storage.googleapis.com/carbonplan-maps/'

const MapRouting = () => {
  const [center, setCenter] = useState(null)
  const [zoom, setZoom] = useState(null)
  const { map } = useMapbox()
  const router = useRouter()

  useEffect(() => {
    if (router.isReady) {
      const { center, zoom } = router.query
      if (center && zoom) {
        map.easeTo({
          center: center.split(',').map(parseFloat),
          zoom: parseFloat(zoom),
          duration: 0,
        })
      }
    }
  }, [router.isReady])

  useEffect(() => {
    map.on('moveend', () => {
      const { lng, lat } = map.getCenter()
      setCenter(`${lng},${lat}`)
      setZoom(map.getZoom())
    })
  }, [])

  useEffect(() => {
    if (center && zoom) {
      const newUrl = new URL(window.location)
      newUrl.searchParams.set('center', center)
      newUrl.searchParams.set('zoom', zoom)

      window.history.replaceState(
        { ...window.history.state, as: newUrl.href, url: newUrl.href },
        '',
        newUrl
      )
    }
  }, [center, zoom])

  return null
}

const MapWrapper = ({ children, setLoading }) => {
  const { theme } = useThemeUI()
  const showRegionPicker = useRegionStore((state) => state.showRegionPicker)
  const datasets = useDatasetsStore((state) => state.datasets)

  const selectedDatasets = Object.keys(datasets || {}).filter(
    (name) => datasets[name].selected
  )

  return (
    <Map zoom={0} center={[0, 0]} debug={false} setLoading={setLoading}>
      <MapRouting />
      <Fill
        color={theme.rawColors.background}
        source={bucket + 'basemaps/ocean'}
        variable={'ocean'}
      />
      <Line
        color={theme.rawColors.primary}
        source={bucket + 'basemaps/land'}
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
