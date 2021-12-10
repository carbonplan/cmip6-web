import { useRegionStore } from '../../region'
import Section from '../../section'
import Chart from './chart'

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
      {Object.keys(regionData).filter((k) => regionData[k]).length === 0 ? (
        'none'
      ) : (
        <Chart data={regionData} />
      )}
    </Section>
  )
}

export default RegionSection
