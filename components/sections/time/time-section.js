import { useEffect } from 'react'

import { useDatasetsStore } from '../../datasets'
import { useTimeStore } from '../../time'

import Sliders from './sliders'
import Section from '../../section'

const DATESTRING_SOURCES = {
  day: {
    historical:
      'https://cmip6downscaling.blob.core.windows.net/scratch/cmip6-web-test-7/CMIP.AS-RCEC.TaiESM1.historical.day.gn/r1i1p1f1',
    projected:
      'https://cmip6downscaling.blob.core.windows.net/scratch/cmip6-web-test-7/ScenarioMIP.AS-RCEC.TaiESM1.ssp245.day.gn/r1i1p1f1',
  },
}
const TimeSection = ({ sx }) => {
  const timescale = useDatasetsStore((state) => state.filters?.timescale)
  const experiment = useDatasetsStore((state) => state.filters?.experiment)
  const dateStrings = useTimeStore((state) => state.dateStrings)
  const loadDateStrings = useTimeStore((state) => state.loadDateStrings)
  const isHistorical = experiment === 'historical'

  useEffect(() => {
    if (timescale && DATESTRING_SOURCES[timescale]) {
      loadDateStrings(
        DATESTRING_SOURCES[timescale][isHistorical ? 'historical' : 'projected']
      )
    }
  }, [isHistorical, timescale])

  return (
    <Section sx={sx.heading} label='Time'>
      {dateStrings ? <Sliders /> : 'Loading...'}
    </Section>
  )
}

export default TimeSection
