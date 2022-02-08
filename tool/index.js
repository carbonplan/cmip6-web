import { Box, Container, Divider, Flex } from 'theme-ui'
import { alpha } from '@theme-ui/color'
import { Column, Group, Row } from '@carbonplan/components'
import { useState } from 'react'

import Header from '../components/header'
import ControlPanel from '../components/control-panel'
import {
  AboutSection,
  DisplaySection,
  QuerySection,
  RegionSection,
  TimeSection,
} from '../components/sections'
import Map from '../components/map'
import ControlPanelDivider from '../components/control-panel-divider'
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
            <ControlPanel
              tooltip='Data browser'
              side='left'
              defaultExpanded
              width={4}
              onClose={closeRegionPicker}
            >
              <Flex
                sx={{
                  flexDirection: 'column',
                  height: 'calc(100vh - 56px)',
                  mx: [-4, -5, -5, -6],
                }}
              >
                <Box
                  sx={{
                    flex: '1 1 auto',
                    overflow: 'hidden',
                    bg: 'transparent',
                    px: [4, 5, 5, 6],
                    transition: 'background-color 0.15s',
                    '@media (hover: hover) and (pointer: fine)': {
                      '&:hover': { bg: alpha('muted', 0.1) },
                    },
                  }}
                >
                  <Row
                    columns={4}
                    sx={{
                      flex: '0 0 auto',
                      height: '100%',
                      overflow: 'scroll',
                      py: [4],
                      px: [4, 5, 5, 6],
                      mx: [-4, -5, -5, -6],
                    }}
                  >
                    <Column width={4} start={1}>
                      <Group spacing={4}>
                        <Box sx={sx.description}>
                          This explorer lets you browse a catalog of climate
                          data. Use the panels below to select datasets,
                          variables, and times.
                        </Box>

                        <Divider sx={{ my: 4 }} />

                        <QuerySection sx={sx} />

                        <Divider sx={{ my: 4 }} />

                        <DisplaySection sx={sx} />

                        <Divider sx={{ my: 4 }} />

                        <AboutSection sx={sx} />
                      </Group>
                    </Column>
                  </Row>
                </Box>

                <Box sx={{ flex: '0 0 auto', px: [4, 5, 5, 6] }}>
                  <ControlPanelDivider sx={{ my: 0 }} />

                  <RegionSection sx={sx} />

                  <ControlPanelDivider />

                  <TimeSection sx={sx} />
                </Box>
              </Flex>
            </ControlPanel>
          </Container>
        </Map>
      </Box>
    </>
  )
}

export default Tool
