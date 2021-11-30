import { Box, Divider } from 'theme-ui'
import { useState } from 'react'
import { Badge, Column, Filter, Group, Row } from '@carbonplan/components'

import Section from '../section'
import data from './data.json'
import Dataset from './dataset'

const formatNumber = (value) => String(value).padStart(2, '0')
const DatasetsSection = ({ sx }) => {
  const [variable, setVariable] = useState({ tavg: true, prec: false })

  const filteredData = data.datasets.filter((d) =>
    d.variables.some((v) => variable[v])
  )

  return (
    <Section sx={sx.heading} label='Datasets'>
      <Row columns={4}>
        <Column start={1} width={1} sx={sx.label}>
          Variable
        </Column>
        <Column start={2} width={3}>
          <Filter values={variable} setValues={setVariable} />
        </Column>
      </Row>
      <Divider sx={{ my: 4 }} />
      <Box sx={{ ...sx.label, mb: 2 }}>
        Results{' '}
        <Badge sx={{ ml: 4 }}>{formatNumber(filteredData.length)}</Badge> /{' '}
        <Badge>{formatNumber(data.datasets.length)}</Badge>
      </Box>
      <Group spacing={2}>
        {filteredData.map((d) => (
          <Dataset key={d.name} dataset={d} />
        ))}
      </Group>
    </Section>
  )
}

export default DatasetsSection
