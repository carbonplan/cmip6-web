import { Box, Divider } from 'theme-ui'
import { useEffect, useMemo } from 'react'
import { Badge, Column, Filter, Group, Row } from '@carbonplan/components'

import { getFiltersCallback, useDatasetsStore } from '../../datasets'
import ExpandableFilter from './expandable-filter'
import Section from '../../section'
import Dataset from './dataset'
import { useRegionStore } from '../../region'

const formatNumber = (value) => String(value).padStart(2, '0')

const LABEL_MAP = {
  // variable
  tasmax: 'tmax',
  tasmin: 'tmin',
  pr: 'prec',

  // timescale
  year: 'yearly',
  month: 'monthly',
  day: 'daily',

  // experiment
  historical: 'historical',
  ssp245: 'SSP2-4.5',
  ssp370: 'SSP3-7.0',
  ssp585: 'SSP5-8.5',
}

const Inner = ({ sx }) => {
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

  const timescaleFilter = useMemo(() => {
    return {
      [LABEL_MAP.year]: filters.timescale === 'year',
      [LABEL_MAP.month]: filters.timescale === 'month',
      [LABEL_MAP.day]: filters.timescale === 'day',
    }
  }, [filters.timescale])

  const historicalFilter = useMemo(() => {
    return {
      [LABEL_MAP.historical]: filters.experiment.historical,
    }
  }, [filters.experiment])
  const scenarioFilter = useMemo(() => {
    return {
      [LABEL_MAP.ssp245]: filters.experiment.ssp245,
      [LABEL_MAP.ssp370]: filters.experiment.ssp370,
      [LABEL_MAP.ssp585]: filters.experiment.ssp585,
    }
  }, [filters.experiment])

  const resultNames = Object.keys(datasets).filter((k) =>
    getFiltersCallback(filters)(datasets[k])
  )

  return (
    <>
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
      <Row columns={4}>
        <Column start={1} width={1} sx={sx.label}>
          GCMs
        </Column>
        <Column start={2} width={3}>
          <ExpandableFilter
            values={filters.gcm}
            setValues={(obj) => {
              setFilters({ gcm: obj })
            }}
            multiSelect
          />
        </Column>
      </Row>
      <Row columns={4}>
        <Column start={1} width={1} sx={sx.label}>
          Scenarios
        </Column>
        <Column start={2} width={3}>
          <Filter
            values={historicalFilter}
            setValues={(obj) => {
              const historical = obj[LABEL_MAP.historical]
              const { historical: previousHistorical, ...previousScenarios } =
                filters.experiment
              const scenarios = historical
                ? { ssp245: false, ssp370: false, ssp585: false }
                : previousScenarios

              setFilters({
                experiment: {
                  historical,
                  ...scenarios,
                },
              })
              clearRegionData()
            }}
            multiSelect
          />
        </Column>
      </Row>
      <Row columns={4}>
        <Column start={2} width={3}>
          <Filter
            values={scenarioFilter}
            setValues={(obj) => {
              const scenarioSelected = Object.keys(obj).some((k) => obj[k])
              const { historical: previousHistorical } = filters.experiment
              const historical = scenarioSelected ? false : previousHistorical

              setFilters({
                experiment: {
                  historical,
                  ssp245: obj[LABEL_MAP.ssp245],
                  ssp370: obj[LABEL_MAP.ssp370],
                  ssp585: obj[LABEL_MAP.ssp585],
                },
              })
              if (historical !== previousHistorical) {
                clearRegionData()
              }
            }}
            multiSelect
          />
        </Column>
      </Row>
      <Row columns={4}>
        <Column start={1} width={1} sx={sx.label}>
          Methods
        </Column>
        <Column start={2} width={3}>
          <Filter
            values={filters.method}
            setValues={(obj) => {
              setFilters({ method: obj })
            }}
            multiSelect
          />
        </Column>
      </Row>
      <Row columns={4}>
        <Column start={1} width={1} sx={sx.label}>
          Timescale
        </Column>
        <Column start={2} width={3}>
          <Filter
            values={timescaleFilter}
            setValues={(obj) => {
              const timescale = Object.keys(LABEL_MAP).find(
                (k) => obj[LABEL_MAP[k]]
              )
              setFilters({ timescale })
            }}
          />
        </Column>
      </Row>
      <Divider sx={{ my: 4 }} />
      <Row columns={4} sx={{ ...sx.label, mb: 3 }}>
        <Column start={1} width={2}>
          <Box>
            Results{' '}
            <Badge sx={{ ml: 4 }}>{formatNumber(resultNames.length)}</Badge>{' '}
            <Box as='span'>/</Box>{' '}
            <Badge sx={{ color: 'secondary' }}>
              {formatNumber(Object.keys(datasets).length)}
            </Badge>
          </Box>
        </Column>
      </Row>
      <Box sx={{ ...sx.label, mb: 3 }}></Box>
      <Group spacing={0}>
        {resultNames.map((name, i) => (
          <Dataset key={name} name={name} last={i == resultNames.length - 1} />
        ))}
      </Group>
    </>
  )
}

const QuerySection = ({ sx }) => {
  const datasets = useDatasetsStore((state) => state.datasets)
  const fetchDatasets = useDatasetsStore((state) => state.fetchDatasets)

  useEffect(() => {
    if (!datasets) {
      fetchDatasets()
    }
  }, [])

  return (
    <Section sx={sx.heading} label='Datasets' defaultExpanded>
      {datasets ? <Inner sx={sx} /> : 'Loading...'}
    </Section>
  )
}

export default QuerySection
