import { Box, Label, Checkbox, Flex } from 'theme-ui'
import { useDataset } from './context'

const Dataset = ({ dataset }) => {
  const {
    dataset: { selected },
    setSelected,
  } = useDataset(dataset.name)

  return (
    <Flex sx={{ justifyContent: 'space-between' }}>
      <Box>{dataset.name}</Box>

      <input
        type='checkbox'
        checked={selected}
        onChange={(e) => setSelected(e.target.checked)}
      />
    </Flex>
  )
}

export default Dataset
