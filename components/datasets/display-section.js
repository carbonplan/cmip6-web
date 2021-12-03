import { Box } from 'theme-ui'
import { useEffect, useRef, useState } from 'react'
import { Group } from '@carbonplan/components'
import { DraggableCore } from 'react-draggable'

import Section from '../section'
import { useDataset, useSelectedDatasets } from './store'
import ControlPanelDivider from '../control-panel-divider'

const DatasetDisplay = ({ name, sx }) => {
  const [draggingProps, setDraggingProps] = useState(null)
  const [top, setTop] = useState(0)

  const container = useRef(null)
  const { dataset, reorder } = useDataset(name)
  const {
    display: { color, colormapName, clim, opacity },
  } = dataset
  const nameElements = name.split('.')
  const shortName = nameElements[nameElements.length - 1]

  const handleKeyDown = (e) => {
    if (e.keyCode === 40) {
      reorder(1)
    } else if (e.keyCode === 38) {
      reorder(-1)
    }
  }

  const dragging = !!draggingProps

  return (
    <>
      {dragging && <Box sx={{ height: draggingProps.height, mb: -4 }} />}
      <DraggableCore
        onStart={(e) => {
          const { top, height, width } =
            container.current.getBoundingClientRect()
          setDraggingProps({ top, height, width, cursorOffset: e.pageY - top })
          setTop(container.current.offsetTop)
        }}
        onDrag={(e) => {
          setTop(e.pageY - draggingProps.cursorOffset)
        }}
        onStop={() => {
          const shiftY = top - draggingProps.top
          const delta = shiftY / draggingProps.height

          reorder(Math.round(delta))
          setDraggingProps(null)
          setTop(0)
        }}
      >
        <Box
          onKeyDown={handleKeyDown}
          tabIndex={0}
          ref={container}
          id={'container'}
          sx={{
            top: top + 'px',
            position: dragging ? 'absolute' : 'relative',
            width: dragging ? draggingProps.width : undefined,
            height: dragging ? draggingProps.height : undefined,
          }}
        >
          <Box
            sx={{
              mt: dragging ? '-8px' : undefined,
            }}
          >
            <Group spacing={4}>
              <ControlPanelDivider />
              <Section
                sx={sx.heading}
                label={shortName}
                color={color}
                expander='left'
              >
                <Group spacing={2}>
                  <Box>Colormap: {colormapName}</Box>
                  <Box>Color range: {clim.join(', ')}</Box>
                  <Box>Opacity: {opacity}</Box>
                </Group>
              </Section>
            </Group>
          </Box>
        </Box>
      </DraggableCore>
    </>
  )
}

const DisplaySection = ({ sx }) => {
  const selectedDatasets = useSelectedDatasets()

  return (
    <Group spacing={4}>
      {selectedDatasets.map((d) => (
        <DatasetDisplay key={d.name} name={d.name} sx={sx} />
      ))}
    </Group>
  )
}

export default DisplaySection
