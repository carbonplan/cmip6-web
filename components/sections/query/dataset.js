import { Box, Flex } from 'theme-ui'
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
      <Box sx={{ color: selected ? color : 'text' }}>{name}</Box>

      <input
        type='checkbox'
        checked={selected}
        onChange={(e) => {
          if (e.target.checked) {
            selectDataset(name)
          } else {
            deselectDataset(name)
            setRegionData(name, null)
          }
        }}
      />
    </Flex>
  )
}

export default Dataset
