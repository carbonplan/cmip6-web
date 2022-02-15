import { Box, Container, Divider } from 'theme-ui'
import { Group } from '@carbonplan/components'
import { SidePanel } from '@carbonplan/layouts'
import { useState } from 'react'

import Header from '../components/header'
import {
  AboutSection,
  DisplaySection,
  QuerySection,
  RegionSection,
  TimeSection,
} from '../components/sections'
import Map from '../components/map'
import { useRegionStore } from '../components/region'

const sx = {
  heading: {
    fontFamily: 'heading',
    letterSpacing: 'smallcaps',
    textTransform: 'uppercase',
    fontSize: [2, 2, 2, 3],
    mb: [3],
  },
  description: {
    fontSize: [1, 1, 1, 2],
  },
  label: {
    color: 'secondary',
    fontFamily: 'mono',
    letterSpacing: 'mono',
    fontSize: [1, 1, 1, 2],
    textTransform: 'uppercase',
    mt: ['3px', '3px', '3px', '1px'],
  },
}

const Tool = () => {
  const [expanded, setExpanded] = useState(true)
  const [loading, setLoading] = useState(false)
  const closeRegionPicker = useRegionStore((state) => state.closeRegionPicker)

  return (
    <>
      <Header loading={loading} />
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
        <Map setLoading={setLoading}>
          <Container>
            <SidePanel
              expanded={expanded}
              setExpanded={setExpanded}
              tooltip='Data browser'
              side='left'
              width={4}
              onClose={closeRegionPicker}
              footer={
                <>
                  <RegionSection sx={sx} />
                  <TimeSection sx={sx} />
                </>
              }
            >
              <Group spacing={4}>
                <Box sx={sx.description}>
                  This explorer lets you browse a catalog of climate data. Use
                  the panels below to select datasets, variables, and times.
                </Box>

                <Divider sx={{ my: 4 }} />

                <QuerySection sx={sx} />

                <Divider sx={{ my: 4 }} />

                <DisplaySection sx={sx} />

                <Divider sx={{ my: 4 }} />

                <AboutSection sx={sx} />
              </Group>
            </SidePanel>
          </Container>
        </Map>
      </Box>
    </>
  )
}

export default Tool
