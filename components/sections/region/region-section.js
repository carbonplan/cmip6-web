import { useMemo } from 'react'
import { Box } from 'theme-ui'
import { useRegionStore } from '../../region'
import { useDatasetsStore } from '../../datasets'
import CollapsibleSection from '../../collapsible-section'
import Chart from './chart'

const RegionSection = ({ sx }) => {
  const openRegionPicker = useRegionStore((state) => state.openRegionPicker)
  const closeRegionPicker = useRegionStore((state) => state.closeRegionPicker)
  const regionData = useRegionStore((state) => state.regionData)
  const variable = useDatasetsStore((state) => state.filters?.variable)

  const variableData = useMemo(
    () =>
      Object.keys(regionData)
        .filter((k) => regionData[k])
        .map((key) => [
          key,
          regionData[key].value ? regionData[key].value[variable] : undefined,
        ]),
    [regionData, variable]
  )

  let content
  if (variableData.length > 0) {
    content = <Chart data={variableData} />
  } else {
    content = 'Select a dataset to view regional data'
  }

  return (
    <Box sx={{ my: [4] }}>
      <CollapsibleSection
        sxLabel={sx.heading}
        label='Regional data'
        onOpen={openRegionPicker}
        onClose={closeRegionPicker}
        collapsible
      >
        {content}
      </CollapsibleSection>
    </Box>
  )
}

export default RegionSection
