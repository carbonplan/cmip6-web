import { Box, Checkbox, Flex, Label } from 'theme-ui'
import shallow from 'zustand/shallow'

import { useDatasetsStore } from '../../datasets'
import { useRegionStore } from '../../region'

const Dataset = ({ name }) => {
  const { selected, color } = useDatasetsStore(
    (state) => state.datasets[name],
    shallow
  )
  const selectDataset = useDatasetsStore((state) => state.selectDataset)
  const deselectDataset = useDatasetsStore((state) => state.deselectDataset)
  const setRegionData = useRegionStore((state) => state.setRegionData)

  return (
    <Flex sx={{ justifyContent: 'space-between' }}>
      <Box
        sx={{
          color: selected ? color : 'text',
          fontFamily: 'faux',
          letterSpacing: 'faux',
          fontSize: [1, 1, 1, 2],
        }}
      >
        {name}
      </Box>

      <Label sx={{ width: 'inherit', display: 'block', position: 'relative' }}>
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
          sx={{
            width: '18px',
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
          }}
        />
      </Label>
    </Flex>
  )
}

export default Dataset
