import { Box } from 'theme-ui'

import { useDatasetsStore } from '../../datasets'
import DisplayEditor from './display-editor'
import Section from '../../section'

const DisplaySection = ({ sx }) => {
  const active = useDatasetsStore((state) => state.active)

  return (
    <Section>
      <Box sx={sx.heading}>Display</Box>

      {active ? (
        <DisplayEditor sx={sx} />
      ) : (
        <Box sx={sx.description}>Select a dataset to view properties.</Box>
      )}
    </Section>
  )
}

export default DisplaySection
