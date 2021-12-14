import { useEffect } from 'react'

import { useDatasetsStore } from '../../datasets'
import { useTimeStore } from '../../time'

import Sliders from './sliders'
import Section from '../../section'

const DATESTRING_SOURCES = {
  daily:
    'https://cmip6downscaling.blob.core.windows.net/scratch/cmip6-web-test-4/CMIP.AWI.AWI-ESM-1-1-LR.historical.day.gn/r1i1p1f1',
}
const TimeSection = ({ sx }) => {
  const timescale = useDatasetsStore((state) => state.filters.timescale)
  const dateStrings = useTimeStore((state) => state.dateStrings)
  const loadDateStrings = useTimeStore((state) => state.loadDateStrings)

  useEffect(() => {
    if (!dateStrings) {
      loadDateStrings(DATESTRING_SOURCES[timescale])
    }
  }, [!dateStrings])

  return (
    <Section sx={sx.heading} label='Time'>
      {dateStrings ? <Sliders /> : 'Loading...'}
    </Section>
  )
}

export default TimeSection
