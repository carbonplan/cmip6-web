import { Box, Container, Divider, Flex, Grid } from 'theme-ui'
import { useBreakpointIndex } from '@theme-ui/match-media'
import { Group, Link } from '@carbonplan/components'
import { Sidebar, SidebarFooter } from '@carbonplan/layouts'
import { useState } from 'react'
import { alpha } from '@theme-ui/color'

import Header from './header'
import MobileSettings from './mobile-settings'
import {
  AboutSection,
  DisplaySection,
  QuerySection,
  RegionSection,
  TimeSection,
} from './sections'
import Map from './map'
import { useRegionStore } from './region'
import LoadingStates from './loading-states'
import useRouting from './use-routing'
import Methods from './methods.md'

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
  mobileOption: (selected, side) => ({
    justifyContent: 'center',
    alignItems: 'center',
    height: '62px',
    cursor: 'pointer',
    fontSize: [3],
    fontFamily: 'heading',
    letterSpacing: 'allcaps',
    textTransform: 'uppercase',
    borderStyle: 'solid',
    borderColor: 'muted',
    borderWidth: '0px',
    borderRightWidth: side === 'left' ? '1px' : 0,
    [side === 'left' ? 'pl' : 'pr']: '16px',
    bg: selected ? alpha('muted', 0.5) : 'background',
  }),
}

const Tool = () => {
  useRouting()
  const index = useBreakpointIndex({ defaultIndex: 2 })
  const [expanded, setExpanded] = useState(index >= 2)
  const [expandedMethods, setExpandedMethods] = useState(false)
  const [loading, setLoading] = useState(false)
  const closeRegionPicker = useRegionStore((state) => state.closeRegionPicker)

  const inner = (
    <Group spacing={4}>
      <Box sx={sx.description}>
        This explorer lets you browse a catalog of raw and downscaled climate
        data. Use the panels below to select datasets, variables, and times.
        Read{' '}
        <Link href='/research/cmip6-downscaling-explainer'>our explainer</Link>{' '}
        for more details.
      </Box>

      <Divider sx={{ my: 4 }} />

      <QuerySection sx={sx} />

      <Divider sx={{ my: 4 }} />

      <DisplaySection sx={sx} />

      <Divider sx={{ my: 4 }} />

      <AboutSection sx={sx} />
    </Group>
  )

  return (
    <>
      <Header expanded={expanded} setExpanded={setExpanded} />
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
            {index < 2 ? (
              <MobileSettings
                expanded={expanded}
                footer={
                  <>
                    <SidebarFooter>
                      <Grid
                        columns={[2]}
                        gap={[0]}
                        sx={{ mx: '-32px', my: '-24px' }}
                      >
                        <Flex
                          sx={sx.mobileOption(!expandedMethods, 'left')}
                          onClick={() => setExpandedMethods(false)}
                        >
                          Data
                        </Flex>
                        <Flex
                          sx={sx.mobileOption(expandedMethods, 'right')}
                          onClick={() => setExpandedMethods(true)}
                        >
                          Methods
                        </Flex>
                      </Grid>
                    </SidebarFooter>
                    <TimeSection sx={sx} />
                  </>
                }
              >
                {expandedMethods ? <Methods /> : inner}
              </MobileSettings>
            ) : (
              <>
                <Sidebar
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
                  {inner}
                </Sidebar>
                <Sidebar
                  expanded={expandedMethods}
                  setExpanded={setExpandedMethods}
                  tooltip='Usage info'
                  side='right'
                  width={4}
                >
                  <Methods />
                </Sidebar>
              </>
            )}

            <LoadingStates loading={loading} expanded={expanded} />
          </Container>
        </Map>
      </Box>
    </>
  )
}

export default Tool
