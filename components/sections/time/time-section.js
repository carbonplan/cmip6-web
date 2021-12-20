import { useEffect } from 'react'

import { useDatasetsStore } from '../../datasets'
import { useTimeStore } from '../../time'

import Sliders from './sliders'
import Section from '../../section'

const DATESTRING_SOURCES = {
  day: 'https://cmip6downscaling.blob.core.windows.net/scratch/cmip6-web-test-7/ScenarioMIP.NUIST.NESM3.ssp585.day.gn/r1i1p1f1',
}
const TimeSection = ({ sx }) => {
  const timescale = useDatasetsStore((state) => state.filters?.timescale)
  const dateStrings = useTimeStore((state) => state.dateStrings)
  const loadDateStrings = useTimeStore((state) => state.loadDateStrings)

  useEffect(() => {
    if (timescale && !dateStrings) {
      loadDateStrings(DATESTRING_SOURCES[timescale])
    }
  }, [timescale, !dateStrings])

  return (
    <Section sx={sx.heading} label='Time'>
      {dateStrings ? <Sliders /> : 'Loading...'}
    </Section>
  )
}

export default TimeSection
