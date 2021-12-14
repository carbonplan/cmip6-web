import { Box } from 'theme-ui'
import { useRef, useState } from 'react'
import { Group } from '@carbonplan/components'
import { DraggableCore } from 'react-draggable'

import { useDatasetsStore } from '../../datasets'
import ControlPanelDivider from '../../control-panel-divider'
import DisplayEditor from './display-editor'

const DatasetDisplay = ({ name, sx }) => {
  const [draggingProps, setDraggingProps] = useState(null)
  const [top, setTop] = useState(0)
  const reorderDataset = useDatasetsStore((state) => state.reorderDataset)

  const container = useRef(null)

  const handleKeyDown = (e) => {
    if (e.keyCode === 40) {
      reorderDataset(name, 1)
    } else if (e.keyCode === 38) {
      reorderDataset(name, -1)
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

          reorderDataset(name, Math.round(delta))
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
            bg: 'background',
            top: top + 'px',
            position: dragging ? 'absolute' : 'relative',
            mx: [-4, -5, -5, -6],
            px: [4, 5, 5, 6],
            zIndex: dragging ? 10 : undefined,
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
              <DisplayEditor name={name} sx={sx} />
            </Group>
          </Box>
        </Box>
      </DraggableCore>
    </>
  )
}

const DisplaySection = ({ sx }) => {
  const selectedOrder = useDatasetsStore((state) => state.selectedOrder)

  return (
    <Group spacing={4}>
      {selectedOrder.map((name) => (
        <DatasetDisplay key={name} name={name} sx={sx} />
      ))}
    </Group>
  )
}

export default DisplaySection
