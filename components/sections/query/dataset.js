import { useState } from 'react'
import { Box, IconButton, Label } from 'theme-ui'
import { Row, Column } from '@carbonplan/components'
import { Check, Info, Search, X } from '@carbonplan/icons'
import AnimateHeight from 'react-animate-height'
import shallow from 'zustand/shallow'

import Eye from './icons/eye'
import EyeFilled from './icons/eye-filled'
import {
  COLORMAP_COLORS,
  DEFAULT_COLORMAPS,
  useDatasetsStore,
  getShortName,
} from '../../datasets'
import { useRegionStore } from '../../region'
import CustomCheckbox from '../../custom-checkbox'
import DatasetInfo from './dataset-info'

const Dataset = ({ name, last }) => {
  const [expanded, setExpanded] = useState(false)
  const anyActive = useDatasetsStore((state) => !!state.active)
  const active = useDatasetsStore((state) => state.active === name)
  const setActive = useDatasetsStore((state) => state.setActive)
  const dataset = useDatasetsStore((state) => state.datasets[name], shallow)
  const filters = useDatasetsStore((state) => state.filters)
  const selectDataset = useDatasetsStore((state) => state.selectDataset)
  const deselectDataset = useDatasetsStore((state) => state.deselectDataset)
  const setRegionData = useRegionStore((state) => state.setRegionData)
  const openRegionPicker = useRegionStore((state) => state.openRegionPicker)
  const { selected } = dataset

  const activeColor =
    COLORMAP_COLORS[dataset.colormapName || DEFAULT_COLORMAPS[filters.variable]]

  let color = 'secondary'
  if (active) {
    color = activeColor
  } else if (selected) {
    color = 'text'
  }

  return (
    <Box
      sx={{
        pt: '4px',
        mb: '1px',
        borderTop: ({ colors }) => `solid 1px ${colors.hinted}`,
        borderBottom: last
          ? ({ colors }) => `solid 1px ${colors.hinted}`
          : 'none',
      }}
    >
      <Row columns={[6, 8, 4, 4]}>
        <Column start={1} width={[4, 6, 2, 3]}>
          <Label
            sx={{
              cursor: 'pointer',
              color,
              fontFamily: 'faux',
              letterSpacing: 'faux',
              fontSize: [1, 1, 1, 2],
              transition: 'color 0.15s',
              '@media (hover: hover) and (pointer: fine)': {
                '&:hover': {
                  color: activeColor,
                },
              },
            }}
            htmlFor={name}
          >
            {getShortName(dataset, filters)}
          </Label>
        </Column>
        <Column start={[5, 7, 3, 4]} width={[2, 2, 2, 1]}>
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
                  mr: 2,
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
              <IconButton
                onClick={() => setExpanded(!expanded)}
                role='checkbox'
                aria-checked={expanded}
                aria-label='Information'
                sx={{
                  cursor: 'pointer',
                  height: '16px',
                  width: '16px',
                  '@media (hover: hover) and (pointer: fine)': {
                    '&:hover > #info': {
                      stroke: 'primary',
                    },
                  },
                  p: [0],
                  transform: 'translate(0px, -4px)',
                }}
              >
                <Info
                  id='info'
                  height='16px'
                  width='16px'
                  sx={{
                    stroke: expanded ? 'primary' : 'secondary',
                    transition: '0.1s',
                  }}
                />
              </IconButton>
            </Box>
          </Box>
        </Column>
      </Row>
      <AnimateHeight
        duration={100}
        height={expanded ? 'auto' : 0}
        easing={'linear'}
      >
        {expanded && <DatasetInfo dataset={dataset} color={color} />}
      </AnimateHeight>
    </Box>
  )
}

export default Dataset
