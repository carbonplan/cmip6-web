import { useDatasetsStore } from '../../datasets'

import Sliders from './sliders'
import Section from '../../section'

const TimeSection = ({ sx }) => {
  const experiment = useDatasetsStore((state) => state.filters?.experiment)
  const dateStrings = useDatasetsStore((state) => {
    if (!state.datasets) {
      return null
    }
    // todo: there should eventually only ever be one actively displayed dataset
    const activeName = Object.keys(state.datasets).find(
      (k) => state.datasets[k].selected
    )
    return state.datasets[activeName]?.dateStrings
  })

  return (
    <Section sx={sx.heading} label='Time'>
      {dateStrings ? (
        <Sliders
          historical={experiment === 'historical'}
          dateStrings={dateStrings}
        />
      ) : (
        'Loading...'
      )}
    </Section>
  )
}

export default TimeSection
