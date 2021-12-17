import { Box, Divider } from 'theme-ui'
import { useMemo } from 'react'
import { Badge, Column, Filter, Group, Row } from '@carbonplan/components'

import { getFiltersCallback, useDatasetsStore } from '../../datasets'
import Section from '../../section'
import Dataset from './dataset'
import { useRegionStore } from '../../region'

const formatNumber = (value) => String(value).padStart(2, '0')

const LABEL_MAP = {
  tasmax: 'tmax',
  tasmin: 'tmin',
  pr: 'prec',
}

const QuerySection = ({ sx }) => {
  const datasets = useDatasetsStore((state) => state.datasets)
  const filters = useDatasetsStore((state) => state.filters)
  const setFilters = useDatasetsStore((state) => state.setFilters)
  const clearRegionData = useRegionStore((state) => state.clearRegionData)

  const variableFilter = useMemo(() => {
    return {
      [LABEL_MAP.tasmax]: filters.variable === 'tasmax',
      [LABEL_MAP.tasmin]: filters.variable === 'tasmin',
      [LABEL_MAP.pr]: filters.variable === 'pr',
    }
  }, [filters.variable])

  const resultNames = Object.keys(datasets).filter((k) =>
    getFiltersCallback(filters)(datasets[k])
  )

  return (
    <Section sx={sx.heading} label='Datasets' defaultExpanded>
      <Row columns={4}>
        <Column start={1} width={1} sx={sx.label}>
          Variable
        </Column>
        <Column start={2} width={3}>
          <Filter
            values={variableFilter}
            setValues={(obj) => {
              const variable = Object.keys(LABEL_MAP).find(
                (k) => obj[LABEL_MAP[k]]
              )
              if (variable !== filters.variable) {
                setFilters({ variable })
                clearRegionData()
              }
            }}
          />
        </Column>
      </Row>
      <Divider sx={{ my: 4 }} />
      <Box sx={{ ...sx.label, mb: 2 }}>
        Results <Badge sx={{ ml: 4 }}>{formatNumber(resultNames.length)}</Badge>{' '}
        / <Badge>{formatNumber(Object.keys(datasets).length)}</Badge>
      </Box>
      <Group spacing={2}>
        {resultNames.map((name) => (
          <Dataset key={name} name={name} />
        ))}
      </Group>
    </Section>
  )
}

export default QuerySection
