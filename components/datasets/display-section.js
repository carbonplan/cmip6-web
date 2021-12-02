import { Box } from 'theme-ui'
import { useEffect, useRef, useState } from 'react'
import { Group } from '@carbonplan/components'
import { DraggableCore } from 'react-draggable'

import Section from '../section'
import { useDataset, useSelectedDatasets } from './store'
import ControlPanelDivider from '../control-panel-divider'

const DatasetDisplay = ({ name, sx }) => {
  const [rel, setRel] = useState(null)
  const [initialTop, setInitialTop] = useState(null)
  const [top, setTop] = useState(0)

  const container = useRef(null)
  const { dataset, reorderDataset } = useDataset(name)
  const {
    display: { colormapName, clim, opacity },
  } = dataset
  const nameElements = name.split('.')
  const shortName = nameElements[nameElements.length - 1]

  const handleKeyDown = (e) => {
    if (e.keyCode === 40) {
      reorderDataset(1)
    } else if (e.keyCode === 38) {
      reorderDataset(-1)
    }
  }

  const dragging = typeof rel === 'number'

  return (
    <>
      <DraggableCore
        onStart={(d) => {
          //   console.log(e, d)
          //   e.stopPropagation()
          setInitialTop(container.current.offsetTop)
          setRel(e.pageY - container.current.offsetTop)
        }}
        onDrag={(d) => {
          setTop(d.pageY - rel)
        }}
        onStop={(d) => {
          const shiftY = top - initialTop
          const delta = shiftY / container.current.offsetHeight

          reorderDataset(Math.round(delta))
          setRel(null)
          setInitialTop(null)
          setTop(0)
        }}
      >
        <Box
          onKeyDown={handleKeyDown}
          tabIndex={0}
          ref={container}
          sx={{
            top: top + 'px',
            position: dragging ? 'absolute' : 'relative',
          }}
        >
          <Group spacing={4}>
            <ControlPanelDivider />
            <Section sx={sx.heading} label={shortName}>
              <Group spacing={2}>
                <Box>Colormap: {colormapName}</Box>
                <Box>Color range: {clim.join(', ')}</Box>
                <Box>Opacity: {opacity}</Box>
              </Group>
            </Section>
          </Group>
        </Box>
      </DraggableCore>
      {dragging && <Box sx={{ height: container.current.offsetHeight }} />}
    </>
  )
}

const DisplaySelection = ({ sx }) => {
  const selectedDatasets = useSelectedDatasets()

  return (
    <Group spacing={4}>
      {selectedDatasets.map((d) => (
        <DatasetDisplay key={d.name} name={d.name} sx={sx} />
      ))}
    </Group>
  )
}

export default DisplaySelection
