import { Group } from '@carbonplan/components'

import { useDatasetsStore } from '../../datasets'
import ControlPanelDivider from '../../control-panel-divider'
import DisplayEditor from './display-editor'

const DisplaySection = ({ sx }) => {
  const selectedOrder = useDatasetsStore((state) => state.selectedOrder)

  return (
    <Group spacing={4}>
      {selectedOrder.map((name) => (
        <Group key={name} spacing={4}>
          <ControlPanelDivider />
          <DisplayEditor name={name} sx={sx} />
        </Group>
      ))}
    </Group>
  )
}

export default DisplaySection
