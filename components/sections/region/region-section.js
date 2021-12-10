import { useMemo } from 'react'

import { useRegionStore } from '../../region'
import { useDatasetsStore } from '../../datasets'
import Section from '../../section'
import Chart from './chart'

const RegionSection = ({ sx }) => {
  const openRegionPicker = useRegionStore((state) => state.openRegionPicker)
  const closeRegionPicker = useRegionStore((state) => state.closeRegionPicker)
  const regionData = useRegionStore((state) => state.regionData)
  const variable = useDatasetsStore((state) => state.filters.variable)

  const loading = useMemo(
    () =>
      Object.keys(regionData).some(
        (k) => regionData[k] && !regionData[k].value
      ),
    [regionData]
  )

  const variableData = useMemo(
    () =>
      Object.keys(regionData)
        .filter(
          (k) =>
            regionData[k] &&
            regionData[k].value &&
            regionData[k].value[variable]
        )
        .map((key) => [key, regionData[key].value[variable]]),
    [regionData, variable]
  )

  let content
  if (loading) {
    content = 'Loading...'
  } else if (variableData.length > 0) {
    content = <Chart data={variableData} />
  } else {
    content = 'Select a dataset to view regional data'
  }

  return (
    <Section
      sx={sx.heading}
      label='Regional data'
      onOpen={openRegionPicker}
      onClose={closeRegionPicker}
    >
      {content}
    </Section>
  )
}

export default RegionSection
