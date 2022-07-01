import { useState } from 'react'
import { Box, Flex, Label } from 'theme-ui'
import { Check, Search, X } from '@carbonplan/icons'
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
import Tooltip from '../../tooltip'
import DatasetInfo from './dataset-info'

const Dataset = ({ name, last }) => {
  const [expanded, setExpanded] = useState(false)
  const anyActive = useDatasetsStore((state) => !!state.active)
  const active = useDatasetsStore((state) => state.active === name)
  const setActive = useDatasetsStore((state) => state.setActive)
  const setHovered = useDatasetsStore((state) => state.setHovered)
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
        pt: '5px',
        mb: '2px',
        borderTop: ({ colors }) => `solid 1px ${colors.hinted}`,
        borderBottom: last
          ? ({ colors }) => `solid 1px ${colors.hinted}`
          : 'none',
      }}
    >
      <Flex sx={{ justifyContent: 'space-between', flexDirection: 'row' }}>
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
          onMouseOver={() => setHovered(name)}
          onMouseLeave={() => setHovered(null)}
        >
          {getShortName(dataset, filters)}
        </Label>
        <Box sx={{ mt: '-8px', flexShrink: 0 }}>
          <Box sx={{ position: 'relative', top: '4px' }}>
            <Label
              sx={{
                width: 'inherit',
                position: 'relative',
                mr: 2,
                display: ['none', 'none', 'inline-block', 'inline-block'],
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
            <Tooltip
              expanded={expanded}
              setExpanded={setExpanded}
              sx={{ pt: '2px' }}
            />
          </Box>
        </Box>
      </Flex>
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
