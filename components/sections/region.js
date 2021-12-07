import { Box } from 'theme-ui'

import { useRegionStore } from '../region'
import Section from '../section'

const RegionSection = ({ sx }) => {
  const openRegionPicker = useRegionStore((state) => state.openRegionPicker)
  const closeRegionPicker = useRegionStore((state) => state.closeRegionPicker)
  const regionData = useRegionStore((state) => state.regionData)

  return (
    <Section
      sx={sx.heading}
      label='Regional data'
      onOpen={openRegionPicker}
      onClose={closeRegionPicker}
    >
      Regional data:
      {Object.keys(regionData).map((k) => {
        const value = regionData[k]
          ? `{ ${Object.keys(regionData[k]).join(', ')} }`
          : 'null'
        return <Box key={k}>{`${k}: ${value}`}</Box>
      })}
    </Section>
  )
}

export default RegionSection
