import { Box } from 'theme-ui'
import { Group } from '@carbonplan/components'

import Section from '../section'
import { useDataset, useSelectedDatasets } from './store'
import ControlPanelDivider from '../control-panel-divider'

const DisplaySelection = ({ sx }) => {
  const selectedDatasets = useSelectedDatasets()

  return (
    <Group spacing={4}>
      {selectedDatasets.map((d, i) => {
        const nameElements = d.name.split('.')
        const shortName = nameElements[nameElements.length - 1]
        return (
          <Group key={d.name} spacing={4}>
            <ControlPanelDivider />
            <Section key={d.name} sx={sx.heading} label={shortName}>
              <Group spacing={2}>
                <Box>Colormap: {d.display.colormapName}</Box>
                <Box>Color range: {d.display.clim.join(', ')}</Box>
                <Box>Opacity: {d.display.opacity}</Box>
              </Group>
            </Section>
          </Group>
        )
      })}
    </Group>
  )
}

export default DisplaySelection
