import { useDatasetsStore } from '../../datasets'

import Sliders from './sliders'
import Section from '../../section'

const TimeSection = ({ sx }) => {
  const experiment = useDatasetsStore((state) => state.filters?.experiment)
  const active = useDatasetsStore((state) => {
    if (!state.datasets) {
      return null
    }
    // todo: there should eventually only ever be one actively displayed dataset
    const activeName = Object.keys(state.datasets).find(
      (k) => state.datasets[k].selected
    )
    return state.datasets[activeName]
  })

  let inner
  if (!active) {
    inner = 'Select a dataset to pan through time points'
  } else if (!active.dateStrings) {
    inner = 'Loading...'
  } else {
    inner = (
      <Sliders
        historical={experiment === 'historical'}
        dateStrings={active.dateStrings}
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
