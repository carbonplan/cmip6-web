import { Box } from 'theme-ui'
import { Column, Row } from '@carbonplan/components'

import { useDatasetsStore } from '../../datasets'
import Sliders from './sliders'
import Section from '../../section'

const TimeSection = ({ sx }) => {
  const experiment = useDatasetsStore((state) => state.filters?.experiment)
  const active = useDatasetsStore((state) => state.active)
  const datasets = useDatasetsStore((state) => state.datasets)
  const { year, month, day } = useDatasetsStore((state) => state.displayTime)

  let inner
  if (datasets && !active) {
    inner = 'Select a dataset to pan through time points'
  } else if (!datasets || !datasets[active].dateStrings) {
    inner = 'Loading...'
  } else {
    inner = (
      <Box sx={{ mb: [-3, -3, -3, -2] }}>
        <Sliders
          historical={experiment.historical}
          dateStrings={datasets[active].dateStrings}
        />
      </Box>
    )
  }

  return (
    <Box sx={{ my: [4] }}>
      <Section>
        <Row columns={[4]}>
          <Column start={1} width={1}>
            <Box sx={{ ...sx.heading, mb: 0, whiteSpace: 'nowrap' }}>
              {new Date(year, month - 1, day).toLocaleString('default', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })}
            </Box>
          </Column>

          <Column start={2} width={3} sx={sx.description}>
            {inner}
          </Column>
        </Row>
      </Section>
    </Box>
  )
}

export default TimeSection
