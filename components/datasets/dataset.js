import { Box, Flex } from 'theme-ui'
import { useDataset } from './context'

const Dataset = ({ dataset }) => {
  const {
    dataset: { selected, display },
    setSelected,
  } = useDataset(dataset.name)

  return (
    <Flex sx={{ justifyContent: 'space-between' }}>
      <Box sx={{ color: selected ? display.color : 'text' }}>
        {dataset.name}
      </Box>

      <input
        type='checkbox'
        checked={selected}
        onChange={(e) => setSelected(e.target.checked)}
      />
    </Flex>
  )
}

export default Dataset
