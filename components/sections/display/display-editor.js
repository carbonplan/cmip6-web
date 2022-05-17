import { Box } from 'theme-ui'
import { Colorbar, Column, Row, Select } from '@carbonplan/components'
import { colormaps, useThemedColormap } from '@carbonplan/colormaps'
import shallow from 'zustand/shallow'

import { formatValue } from '../../utils'
import {
  convertUnits,
  useDatasetsStore,
  DEFAULT_DISPLAY_UNITS,
} from '../../datasets'

const UNITS_OPTIONS = {
  tasmax: [
    { value: 'K', label: 'K' },
    { value: '°C', label: '°C' },
    { value: '°F', label: '°F' },
  ],
  tasmin: [
    { value: 'K', label: 'K' },
    { value: '°C', label: '°C' },
    { value: '°F', label: '°F' },
  ],
  pr: [
    { value: 'mm', label: 'mm' },
    { value: 'in', label: 'in' },
    { value: 'kg m-2 s-1', label: 'kg/m²/s' },
  ],
}
const DisplayEditor = ({ sx }) => {
  const name = useDatasetsStore((state) => state.active)
  const variable = useDatasetsStore((state) => state.filters.variable)
  const displayUnits = useDatasetsStore((state) => state.displayUnits)
  const setDisplayUnits = useDatasetsStore((state) => state.setDisplayUnits)

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
        <Box sx={{ ...sx.label, mb: 2 }}>
          Units
          <Select
            value={displayUnits}
            onChange={(e) => setDisplayUnits(e.target.value)}
            size='xs'
            sx={{
              mt: [1],
              display: 'block',
            }}
            sxSelect={{
              fontFamily: 'mono',
              fontSize: [1, 1, 1, 2],
              width: '100%',
              pb: [1],
              backgroundColor: 'background',
            }}
          >
            {UNITS_OPTIONS[variable].map(({ value, label }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </Select>
        </Box>
      </Column>

      <Column start={1} width={[6, 4, 4, 4]}>
        <Box>
          <Box sx={{ ...sx.label, mb: '5px' }}>
            {variable} (
            <Box as='span' sx={{ textTransform: 'none' }}>
              {
                UNITS_OPTIONS[variable].find(
                  ({ value }) => value === displayUnits
                )?.label
              }
            </Box>
            )
          </Box>
          <Colorbar
            colormap={colormap}
            format={(d) =>
              formatValue(
                convertUnits(d, DEFAULT_DISPLAY_UNITS[variable], displayUnits)
              )
            }
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
