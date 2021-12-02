import { Box, Divider } from 'theme-ui'
import { useMemo } from 'react'
import { Badge, Column, Filter, Group, Row } from '@carbonplan/components'
import shallow from 'zustand/shallow'

import Section from '../section'
import data from './data.json'
import Dataset from './dataset'
import { useDatasetsStore } from './store'
import { getFiltersCallback } from './utils'

const formatNumber = (value) => String(value).padStart(2, '0')

const QuerySection = ({ sx }) => {
  const { filters, setFilters } = useDatasetsStore(
    ({ filters, setFilters }) => ({ filters, setFilters }),
    shallow
  )

  const variableFilter = useMemo(() => {
    return {
      tavg: filters.variable === 'tavg',
      prec: filters.variable === 'prec',
    }
  }, [filters.variable])

  const filteredData = data.datasets.filter(getFiltersCallback(filters))

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

export default QuerySection
