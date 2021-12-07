import { Box } from 'theme-ui'
import { useState } from 'react'
import { Group, Input, Select } from '@carbonplan/components'
import { colormaps } from '@carbonplan/colormaps'
import shallow from 'zustand/shallow'

import Section from '../section'
import { useDatasetsStore } from '../datasets'

const DisplayEditor = ({ name, sx }) => {
  const updateDatasetDisplay = useDatasetsStore(
    (state) => state.updateDatasetDisplay
  )
  const {
    color,
    colormapName,
    clim,
    opacity: initialOpacity,
  } = useDatasetsStore((state) => state.datasets[name], shallow)
  const [opacity, setOpacity] = useState(initialOpacity)
  const nameElements = name.split('.')
  const shortName = nameElements[nameElements.length - 1]

  return (
    <Section sx={sx.heading} label={shortName} color={color} expander='left'>
      <Group spacing={4}>
        <Box sx={{ ...sx.label, mb: 2 }}>
          Colormap
          <Select
            value={colormapName}
            onChange={(e) =>
              updateDatasetDisplay(name, { colormapName: e.target.value })
            }
          >
            {colormaps.map(({ name }) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </Select>
        </Box>

        <Box>
          <Box sx={{ ...sx.label, mb: 2 }}>Color range</Box>
          {clim.join(', ')}
        </Box>

        <Box sx={{ ...sx.label, mb: 2 }}>
          Opacity
          <Input
            value={opacity}
            onChange={(e) => setOpacity(e.target.value)}
            onBlur={() => {
              const validated = Math.min(Math.max(Number(opacity), 0), 1)
              setOpacity(validated)
              updateDatasetDisplay(name, { opacity: validated })
            }}
          />
        </Box>
      </Group>
    </Section>
  )
}
export default DisplayEditor
