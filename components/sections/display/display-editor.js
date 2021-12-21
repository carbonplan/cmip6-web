import { Box } from 'theme-ui'
import { useMemo, useState } from 'react'
import { Colorbar, Group, Input, Select } from '@carbonplan/components'
import { colormaps, useThemedColormap } from '@carbonplan/colormaps'
import shallow from 'zustand/shallow'

import Section from '../../section'
import { getSelectedShortNames, useDatasetsStore } from '../../datasets'

const DisplayEditor = ({ name, sx }) => {
  const datasets = useDatasetsStore((state) => state.datasets)
  const updateDatasetDisplay = useDatasetsStore(
    (state) => state.updateDatasetDisplay
  )
  const {
    color,
    colormapName,
    clim,
    opacity: initialOpacity,
  } = useDatasetsStore((state) => state.datasets[name], shallow)
  const colormap = useThemedColormap(colormapName)
  const [opacity, setOpacity] = useState(initialOpacity)

  const shortName = useMemo(
    () => getSelectedShortNames(datasets)[name],
    [name, datasets]
  )
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
          <Colorbar colormap={colormap} clim={clim} horizontal width='100%' />
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
