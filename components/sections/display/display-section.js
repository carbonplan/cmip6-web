import { Box } from 'theme-ui'

import { useDatasetsStore } from '../../datasets'
import DisplayEditor from './display-editor'

const DisplaySection = ({ sx }) => {
  const active = useDatasetsStore((state) => state.active)

  return (
    <Box>
      <Box sx={sx.heading}>Display</Box>

      {active ? (
        <DisplayEditor sx={sx} />
      ) : (
        <Box sx={sx.description}>
          Select a dataset above to view properties.
        </Box>
      )}
    </Box>
  )
}

export default DisplaySection
