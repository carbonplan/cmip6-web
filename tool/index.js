import { Box, Container } from 'theme-ui'
import { Group } from '@carbonplan/components'
import { useCallback } from 'react'

import Header from '../components/header'
import ControlPanel from '../components/control-panel'
import QuerySection from '../components/query/query-section'
import DisplaySection from '../components/display/display-section'
import Map from '../components/map'
import ControlPanelDivider from '../components/control-panel-divider'
import { useRegionContext } from '../components/region'

const sx = {
  heading: {
    fontFamily: 'heading',
    letterSpacing: 'smallcaps',
    textTransform: 'uppercase',
    fontSize: [2, 2, 2, 3],
  },
  description: {
    fontSize: [1, 1, 1, 2],
  },
  label: {
    color: 'secondary',
    fontFamily: 'faux',
    letterSpacing: 'smallcaps',
    fontSize: [2, 2, 2, 3],
  },
}

const Tool = () => {
  const { showRegionPicker, setShowRegionPicker } = useRegionContext()

  const handleClose = useCallback(() => {
    if (!showRegionPicker) {
      setShowRegionPicker(false)
    }
  }, [showRegionPicker])

  return (
    <>
      <Header />
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          width: '100%',
          left: 0,
          overflow: 'clip',
        }}
      >
        <Map>
          <Container>
            <ControlPanel
              tooltip='Data browser'
              side='left'
              defaultExpanded
              width={4}
              onClose={handleClose}
            >
              <Group spacing={4}>
                <Box sx={sx.description}>
                  Select dimensions of datasets to view and inspect in the map.
                </Box>

                <ControlPanelDivider />

                <QuerySection sx={sx} />

                <ControlPanelDivider sx={{ mb: [-4] }} />
              </Group>
            </ControlPanel>

            <ControlPanel tooltip='Adjust display' side='right' width={2}>
              <Group spacing={4}>
                <Box sx={sx.description}>
                  Customize display of map layers. Drag to reorder.
                </Box>

                <DisplaySection sx={sx} />

                <ControlPanelDivider sx={{ mb: [-4] }} />
              </Group>
            </ControlPanel>
          </Container>
        </Map>
      </Box>
    </>
  )
}

export default Tool
