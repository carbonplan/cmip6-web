import { Box, Checkbox, Flex, Label } from 'theme-ui'
import shallow from 'zustand/shallow'

import { COLORMAP_COLORS, useDatasetsStore } from '../../datasets'
import { useRegionStore } from '../../region'

const sx = {
  checkbox: {
    width: '18px',
    cursor: 'pointer',
    transition: 'color 0.15s',
    'input:not(:checked) ~ &': {
      color: 'secondary',
    },

    '@media (hover: hover) and (pointer: fine)': {
      'input:hover ~ &': { color: 'primary' },
    },

    'input:focus ~ &': {
      bg: 'inherit',
    },
  },
}
const Dataset = ({ name }) => {
  const active = useDatasetsStore((state) => state.active === name)
  const setActive = useDatasetsStore((state) => state.setActive)
  const { colormapName, selected } = useDatasetsStore(
    (state) => state.datasets[name],
    shallow
  )
  const selectDataset = useDatasetsStore((state) => state.selectDataset)
  const deselectDataset = useDatasetsStore((state) => state.deselectDataset)
  const setRegionData = useRegionStore((state) => state.setRegionData)

  let color = 'secondary'
  if (active) {
    color = COLORMAP_COLORS[colormapName]
  } else if (selected) {
    color = 'text'
  }
  return (
    <Flex sx={{ justifyContent: 'space-between' }}>
      <Box
        sx={{
          color,
          fontFamily: 'faux',
          letterSpacing: 'faux',
          fontSize: [1, 1, 1, 2],
        }}
      >
        {name}
      </Box>

      <Box>
        <Label
          sx={{
            width: 'inherit',
            display: 'inline-block',
            position: 'relative',
          }}
        >
          <Checkbox
            checked={active}
            onChange={(e) => {
              if (e.target.checked && !active) {
                setActive(name)
              } else if (active) {
                setActive(null)
              }
            }}
            sx={sx.checkbox}
          />
        </Label>

        <Label
          sx={{
            width: 'inherit',
            display: 'inline-block',
            position: 'relative',
          }}
        >
          <Checkbox
            checked={selected}
            onChange={(e) => {
              if (e.target.checked) {
                selectDataset(name)
              } else {
                deselectDataset(name)
                setRegionData(name, null)
              }
            }}
            sx={sx.checkbox}
          />
        </Label>
      </Box>
    </Flex>
  )
}

export default Dataset
