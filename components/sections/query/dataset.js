import { Box, Label } from 'theme-ui'
import { Row, Column } from '@carbonplan/components'
import { Check, Search, X } from '@carbonplan/icons'
import shallow from 'zustand/shallow'

import Eye from './icons/eye'
import EyeFilled from './icons/eye-filled'
import {
  COLORMAP_COLORS,
  DEFAULT_COLORMAPS,
  useDatasetsStore,
} from '../../datasets'
import { useRegionStore } from '../../region'
import CustomCheckbox from '../../custom-checkbox'

const Dataset = ({ name, last }) => {
  const anyActive = useDatasetsStore((state) => !!state.active)
  const active = useDatasetsStore((state) => state.active === name)
  const setActive = useDatasetsStore((state) => state.setActive)
  const { colormapName, selected } = useDatasetsStore(
    (state) => state.datasets[name],
    shallow
  )
  const variable = useDatasetsStore((state) => state.filters.variable)
  const selectDataset = useDatasetsStore((state) => state.selectDataset)
  const deselectDataset = useDatasetsStore((state) => state.deselectDataset)
  const setRegionData = useRegionStore((state) => state.setRegionData)
  const openRegionPicker = useRegionStore((state) => state.openRegionPicker)

  let color = 'secondary'
  if (active) {
    color = COLORMAP_COLORS[colormapName]
  } else if (selected) {
    color = 'text'
  }

  return (
    <Row
      columns={[4]}
      sx={{
        pt: '4px',
        mb: '1px',
        borderTop: ({ colors }) => `solid 1px ${colors.hinted}`,
        borderBottom: last
          ? ({ colors }) => `solid 1px ${colors.hinted}`
          : 'none',
      }}
    >
      <Column start={1} width={3}>
        <Label
          sx={{
            color,
            cursor: 'pointer',
            fontFamily: 'faux',
            letterSpacing: 'faux',
            fontSize: [1, 1, 1, 2],
            transition: 'color 0.15s',
            '@media (hover: hover) and (pointer: fine)': {
              '&:hover': {
                color:
                  COLORMAP_COLORS[colormapName || DEFAULT_COLORMAPS[variable]],
              },
            },
          }}
          htmlFor={name}
        >
          {name}
        </Label>
      </Column>
      <Column start={4} width={1}>
        <Box sx={{ mt: '-8px', mr: '2px', float: 'right' }}>
          <Box sx={{ position: 'relative', top: '4px' }}>
            <Label
              sx={{
                width: 'inherit',
                display: 'inline-block',
                position: 'relative',
                mr: 2,
              }}
            >
              <CustomCheckbox
                uncheckedIcon={Search}
                checkedIcon={Check}
                checkedHoverIcon={X}
                checked={selected}
                onChange={(e) => {
                  if (e.target.checked) {
                    selectDataset(name)
                    if (!anyActive) setActive(name)
                    openRegionPicker()
                  } else {
                    deselectDataset(name)
                    setRegionData(name, null)
                  }
                }}
              />
            </Label>
            <Label
              sx={{
                width: 'inherit',
                display: 'inline-block',
                position: 'relative',
              }}
            >
              <CustomCheckbox
                id={name}
                uncheckedIcon={Eye}
                checkedIcon={EyeFilled}
                checked={active}
                onChange={(e) => {
                  if (e.target.checked && !active) {
                    setActive(name)
                  }
                }}
              />
            </Label>
          </Box>
        </Box>
      </Column>
    </Row>
  )
}

export default Dataset
