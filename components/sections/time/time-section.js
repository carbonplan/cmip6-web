import { Box } from 'theme-ui'
import { SidePanelFooter } from '@carbonplan/layouts'

import { useDatasetsStore } from '../../datasets'
import Sliders from './sliders'
import SlidersDisabled from './sliders-disabled'

const TimeSection = ({ sx }) => {
  const experiment = useDatasetsStore((state) => state.filters?.experiment)
  const active = useDatasetsStore((state) => state.active)
  const datasets = useDatasetsStore((state) => state.datasets)

  let inner
  const disabled =
    (datasets && !active) || !datasets || !datasets[active].dateStrings
  if (disabled) {
    inner = (
      <Box sx={{ mb: [-3, -3, -3, -2] }}>
        <SlidersDisabled />
      </Box>
    )
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
    <SidePanelFooter
      sx={{
        pointerEvents: !disabled ? 'all' : 'none',
        pt: [3],
      }}
    >
      {inner}
    </SidePanelFooter>
  )
}

export default TimeSection
