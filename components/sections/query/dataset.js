import { Box, Flex } from 'theme-ui'
import shallow from 'zustand/shallow'

import { useDatasetsStore } from '../../datasets'

const Dataset = ({ name }) => {
  const { selected, color } = useDatasetsStore(
    (state) => state.datasets[name],
    shallow
  )
  const selectDataset = useDatasetsStore((state) => state.selectDataset)
  const deselectDataset = useDatasetsStore((state) => state.deselectDataset)

  return (
    <Flex sx={{ justifyContent: 'space-between' }}>
      <Box sx={{ color: selected ? color : 'text' }}>{name}</Box>

      <input
        type='checkbox'
        checked={selected}
        onChange={(e) =>
          e.target.checked ? selectDataset(name) : deselectDataset(name)
        }
      />
    </Flex>
  )
}

export default Dataset
