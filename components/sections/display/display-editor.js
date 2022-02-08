import { Box } from 'theme-ui'
import { useMemo, useState } from 'react'
import { Colorbar, Column, Row, Select } from '@carbonplan/components'
import { colormaps, useThemedColormap } from '@carbonplan/colormaps'
import shallow from 'zustand/shallow'

import { getSelectedShortNames, useDatasetsStore } from '../../datasets'

const DisplayEditor = ({ sx }) => {
  const name = useDatasetsStore((state) => state.active)
  const datasets = useDatasetsStore((state) => state.datasets)
  const updateDatasetDisplay = useDatasetsStore(
    (state) => state.updateDatasetDisplay
  )
  const {
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
    <Row columns={4}>
      <Column start={1} width={2}>
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
      </Column>

      <Column start={3} width={2}>
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
      </Column>
    </Row>
  )
}
export default DisplayEditor
