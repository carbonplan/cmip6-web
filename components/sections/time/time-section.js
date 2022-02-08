import { Box } from 'theme-ui'

import { useDatasetsStore } from '../../datasets'
import Sliders from './sliders'

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
      <Box sx={{ ...sx.heading, display: ['none', 'none', 'none', 'inherit'] }}>
        Time
      </Box>
      {inner}
    </Box>
  )
}

export default TimeSection
