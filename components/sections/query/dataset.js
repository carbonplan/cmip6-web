import { Box, Checkbox, Flex, Label } from 'theme-ui'
import { Row, Column } from '@carbonplan/components'
import { ArrowThin, Check, X } from '@carbonplan/icons'
import shallow from 'zustand/shallow'

import CustomCheckbox from './custom-checkbox'
import EyeOpen from './icons/eye-open'
import EyeClosed from './icons/eye-closed'
import {
  COLORMAP_COLORS,
  DEFAULT_COLORMAPS,
  useDatasetsStore,
} from '../../datasets'
import { useRegionStore } from '../../region'

const ArrowThinDown = ({ sx, props }) => {
  return <ArrowThin sx={{ transform: 'rotate(90deg)', ...sx }} {...props} />
}

const Dataset = ({ name, last }) => {
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
        pt: '5px',
        mb: 0,
        borderTop: ({ colors }) => `solid 1px ${colors.hinted}`,
        borderBottom: last
          ? ({ colors }) => `solid 1px ${colors.hinted}`
          : 'none',
      }}
    >
      <Column start={1} width={3}>
        <Box
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
          onClick={(e) => {
            setActive(name)
          }}
        >
          {name}
        </Box>
      </Column>
      <Column start={4} width={1}>
        <Box sx={{ mt: '-6px', mr: '2px', float: 'right' }}>
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
                uncheckedIcon={ArrowThinDown}
                checkedIcon={Check}
                checkedHoverIcon={X}
                checked={selected}
                onChange={(e) => {
                  if (e.target.checked) {
                    selectDataset(name)
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
                uncheckedIcon={EyeClosed}
                checkedIcon={EyeOpen}
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
