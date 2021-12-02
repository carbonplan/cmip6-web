import { Box, Flex } from 'theme-ui'
import { useDataset } from './store'

const Dataset = ({ dataset }) => {
  const {
    dataset: { selected, display },
    selectDataset,
    deselectDataset,
  } = useDataset(dataset.name)

  return (
    <Flex sx={{ justifyContent: 'space-between' }}>
      <Box sx={{ color: selected ? display.color : 'text' }}>
        {dataset.name}
      </Box>

      <input
        type='checkbox'
        checked={selected}
        onChange={(e) =>
          e.target.checked ? selectDataset() : deselectDataset()
        }
      />
    </Flex>
  )
}

export default Dataset
