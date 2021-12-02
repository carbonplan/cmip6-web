import { Box } from 'theme-ui'
import { Group } from '@carbonplan/components'

import Section from '../section'
import { useDataset, useSelectedDatasets } from './store'
import ControlPanelDivider from '../control-panel-divider'

const DatasetDisplay = ({ name, sx }) => {
  const { dataset, reorderDataset } = useDataset(name)
  const {
    display: { colormapName, clim, opacity },
  } = dataset
  const nameElements = name.split('.')
  const shortName = nameElements[nameElements.length - 1]

  const handleKeyDown = (e) => {
    if (e.keyCode === 40) {
      reorderDataset(1)
    } else if (e.keyCode === 38) {
      reorderDataset(-1)
    }
  }

  return (
    <Box onKeyDown={handleKeyDown} tabIndex={0}>
      <Group spacing={4}>
        <ControlPanelDivider />
        <Section sx={sx.heading} label={shortName}>
          <Group spacing={2}>
            <Box>Colormap: {colormapName}</Box>
            <Box>Color range: {clim.join(', ')}</Box>
            <Box>Opacity: {opacity}</Box>
          </Group>
        </Section>
      </Group>
    </Box>
  )
}

const DisplaySelection = ({ sx }) => {
  const selectedDatasets = useSelectedDatasets()

  return (
    <Group spacing={4}>
      {selectedDatasets.map((d) => (
        <DatasetDisplay key={d.name} name={d.name} sx={sx} />
      ))}
    </Group>
  )
}

export default DisplaySelection
