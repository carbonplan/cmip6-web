import { Box } from 'theme-ui'

import { useDatasetsStore } from '../../datasets'
import DisplayEditor from './display-editor'

const DisplaySection = ({ sx }) => {
  const active = useDatasetsStore((state) => state.active)

  return active ? (
    <DisplayEditor name={active} sx={sx} />
  ) : (
    <Box sx={sx.description}>Select a dataset to view properties.</Box>
  )
}

export default DisplaySection
