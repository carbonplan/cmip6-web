import { Box, Container } from 'theme-ui'
import { Guide, Group, Meta } from '@carbonplan/components'
import { useState } from 'react'

import ControlPanel from '../components/control-panel'
import Map from '../components/map'
import ControlPanelDivider from '../components/control-panel-divider'

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
    fontFamily: 'faux',
    letterSpacing: 'smallcaps',
    fontSize: [2, 2, 2, 3],
    mb: [2],
  },
}

const Tool = () => {
  return (
    <>
      <Container>
        <Guide color='teal' />
      </Container>

      <Meta
        card={'https://images.carbonplan.org/social/maps-demo.png'}
        description={'TK'}
        title={'CMIP6 downscaling / research / carbonplan'}
      />

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
            <ControlPanel tooltip='Data browser' side='left' width={4}>
              <Group spacing={4}>
                <Box sx={sx.description}>Data browser intro</Box>

                <ControlPanelDivider sx={{ mb: [-4] }} />
              </Group>
            </ControlPanel>

            <ControlPanel tooltip='Adjust display' side='right' width={2}>
              <Group spacing={4}>
                <Box sx={sx.description}>Display options intro</Box>

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
