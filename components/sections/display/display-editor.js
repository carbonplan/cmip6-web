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

  const setClim = (setter) => {
    updateDatasetDisplay(name, { clim: setter(clim) })
  }
  return (
    <Section
      sx={{ ...sx.heading, textTransform: 'none' }}
      label={shortName}
      color={color}
      expander='left'
    >
      <Group spacing={4}>
        <Box sx={{ ...sx.label, mb: 2 }}>
          Colormap
          <Select
            value={colormapName}
            onChange={(e) =>
              updateDatasetDisplay(name, { colormapName: e.target.value })
            }
            size='xs'
            sx={{
              mt: [1],
              display: 'block',
            }}
            sxSelect={{
              textTransform: 'uppercase',
              fontFamily: 'mono',
              fontSize: [1, 1, 1, 2],
              width: '100%',
              pb: [1],
            }}
          >
            {colormaps.map(({ name }) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </Select>
        </Box>

        <Box>
          <Box sx={{ ...sx.label, mb: 1 }}>Color range</Box>
          <Colorbar
            colormap={colormap}
            clim={clim}
            setClim={setClim}
            horizontal
            bottom
            width={'100%'}
            sxClim={{ fontSize: [1, 1, 1, 2], pt: [1], pb: ['2px'] }}
          />
        </Box>

        <Box sx={{ ...sx.label, mb: 2 }}>
          Opacity
          <Input
            size='xs'
            sx={{
              width: '100%',
              fontSize: [1, 1, 1, 2],
              fontFamily: 'mono',
              letterSpacing: 'mono',
              pb: ['2px', '2px', '2px', '4px'],
            }}
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
