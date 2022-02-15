import { Box } from 'theme-ui'
import { alpha } from '@theme-ui/color'
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
    <Box
      sx={{
        px: [4, 5, 5, 6],
        transition: 'background-color 0.15s',
        cursor: disabled ? 'default' : 'pointer',
        '@media (hover: hover) and (pointer: fine)': {
          '&:hover': { bg: disabled ? 'transparent' : alpha('muted', 0.25) },
        },
        pt: [3],
        pb: [4],
      }}
    >
      {inner}
    </Box>
  )
}

export default TimeSection
