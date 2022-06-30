import { Box } from 'theme-ui'

import { useDatasetsStore } from '../../datasets'
import DisplayEditor from './display-editor'
import TooltipWrapper from '../query/tooltip-wrapper'

const DisplaySection = ({ sx }) => {
  const active = useDatasetsStore((state) => state.active)

  return (
    <Box>
      {active ? (
        <>
          <TooltipWrapper
            tooltip='Use the menus to choose a colormap or change the units. Click and drag
        the colorbar limits to change them. Click the "sun" in the upper right
        to switch between light mode and dark mode.'
          >
            <Box sx={{ ...sx.heading, mb: [0] }}>Display</Box>
          </TooltipWrapper>
          <Box sx={{ pt: [3] }}>
            <DisplayEditor sx={sx} />
          </Box>
        </>
      ) : (
        <>
          <Box sx={{ ...sx.heading }}>Display</Box>
          <Box sx={sx.description}>
            Select a dataset above to view display properties.
          </Box>
        </>
      )}
    </Box>
  )
}

export default DisplaySection
