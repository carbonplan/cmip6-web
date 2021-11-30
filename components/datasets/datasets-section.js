import { Box, Divider } from 'theme-ui'
import { useMemo, useState } from 'react'
import { Badge, Column, Filter, Group, Row } from '@carbonplan/components'

import Section from '../section'
import data from './data.json'
import Dataset from './dataset'
import { useFilters } from './context'

const formatNumber = (value) => String(value).padStart(2, '0')

const DatasetsSection = ({ sx }) => {
  const { filters, setFilters } = useFilters()

  const variableFilter = useMemo(() => {
    return {
      tavg: filters.variable === 'tavg',
      prec: filters.variable === 'prec',
    }
  }, [filters.variable])

  const filteredData = data.datasets.filter((d) =>
    d.variables.some((v) => v === filters.variable)
  )

  return (
    <Section sx={sx.heading} label='Datasets'>
      <Row columns={4}>
        <Column start={1} width={1} sx={sx.label}>
          Variable
        </Column>
        <Column start={2} width={3}>
          <Filter
            values={variableFilter}
            setValues={(obj) =>
              setFilters({
                ...filters,
                variable: Object.keys(obj).find((k) => obj[k]),
              })
            }
          />
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
