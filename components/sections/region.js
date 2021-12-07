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
      Regional data: {JSON.stringify(regionData)}
    </Section>
  )
}

export default RegionSection
