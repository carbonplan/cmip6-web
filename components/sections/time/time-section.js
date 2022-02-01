import { useDatasetsStore } from '../../datasets'

import Sliders from './sliders'
import Section from '../../section'
import { useDateStringsStore } from '../../date-strings'

const TimeSection = ({ sx }) => {
  const experiment = useDatasetsStore((state) => state.filters?.experiment)
  const active = useDatasetsStore((state) => state.active)
  const dateStringsLoaded = useDateStringsStore(
    (state) => !!state.dateStrings[active]
  )

  let inner
  if (!active) {
    inner = 'Select a dataset to pan through time points'
  } else if (!dateStringsLoaded) {
    inner = 'Loading...'
  } else {
    inner = <Sliders historical={experiment.historical} />
  }

  return (
    <Section sx={sx.heading} label='Time'>
      {inner}
    </Section>
  )
}

export default TimeSection
