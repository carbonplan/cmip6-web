import { Box } from 'theme-ui'
import { Colorbar, Column, Row, Select } from '@carbonplan/components'
import { colormaps, useThemedColormap } from '@carbonplan/colormaps'
import shallow from 'zustand/shallow'

import { useDatasetsStore } from '../../datasets'

const DisplayEditor = ({ sx }) => {
  const name = useDatasetsStore((state) => state.active)
  const updateDatasetDisplay = useDatasetsStore(
    (state) => state.updateDatasetDisplay
  )
  const { colormapName, clim } = useDatasetsStore(
    (state) => state.datasets[name],
    shallow
  )
  const colormap = useThemedColormap(colormapName)

  const setClim = (setter) => {
    updateDatasetDisplay(name, { clim: setter(clim) })
  }
  return (
    <Row columns={[6, 8, 4, 4]}>
      <Column start={1} width={[6, 4, 2, 2]}>
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

      <Column start={[1, 1, 3, 3]} width={[6, 4, 2, 2]}>
        <Box>
          <Box sx={{ ...sx.label, mb: '5px' }}>Color range</Box>
          <Colorbar
            colormap={colormap}
            clim={clim}
            setClim={setClim}
            horizontal
            width={'100%'}
            sxClim={{ fontSize: [1, 1, 1, 2], mt: ['-1px'], pb: ['2px'] }}
          />
        </Box>
      </Column>
    </Row>
  )
}
export default DisplayEditor
