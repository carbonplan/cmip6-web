import { useDatasetsStore } from '../../datasets'

import Sliders from './sliders'
import Section from '../../section'

const TimeSection = ({ sx }) => {
  const experiment = useDatasetsStore((state) => state.filters?.experiment)
  const active = useDatasetsStore((state) => state.active)
  const datasets = useDatasetsStore((state) => state.datasets)

  let inner
  if (datasets && !active) {
    inner = 'Select a dataset to pan through time points'
  } else if (!datasets || !datasets[active].dateStrings) {
    inner = 'Loading...'
  } else {
    inner = (
      <Sliders
        historical={experiment.historical}
        dateStrings={datasets[active].dateStrings}
      />
    )
  }

  return (
    <Section sx={sx.heading} label='Time'>
      {inner}{' '}
    </Section>
  )
}

export default TimeSection
