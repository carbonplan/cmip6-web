import { Box, Divider, Flex, Spinner } from 'theme-ui'
import { useEffect, useMemo } from 'react'
import shallow from 'zustand/shallow'
import { Badge, Column, Filter, Group, Row } from '@carbonplan/components'

import { getFiltersCallback, useDatasetsStore } from '../../datasets'
import ExpandableFilter from './expandable-filter'
import Dataset from './dataset'
import { useRegionStore } from '../../region'
import TooltipWrapper from './tooltip-wrapper'

const formatNumber = (value) => String(value).padStart(2, '0')

const LABEL_MAP = {
  // variable
  tasmax: 'tasmax',
  tasmin: 'tasmin',
  pr: 'pr',

  // timescale
  year: 'yearly',
  month: 'monthly',
  // day: 'daily',

  // experiment
  historical: 'historical',
  ssp245: 'SSP2-4.5',
  ssp370: 'SSP3-7.0',
  ssp585: 'SSP5-8.5',
}

const Results = ({ sx }) => {
  const total = useDatasetsStore((state) => Object.keys(state.datasets).length)
  const results = useDatasetsStore(
    (state) =>
      Object.keys(state.datasets).filter((k) =>
        getFiltersCallback(state.filters)(state.datasets[k])
      ),
    shallow
  )

  return (
    <>
      <Row columns={[6, 8, 4, 4]} sx={{ ...sx.label, mb: 3 }}>
        <Column start={1} width={[6, 8, 4, 4]}>
          <Box>
            Results <Badge sx={{ ml: 4 }}>{formatNumber(results.length)}</Badge>{' '}
            <Box as='span'>/</Box>{' '}
            <Badge sx={{ color: 'secondary' }}>{formatNumber(total)}</Badge>
          </Box>
        </Column>
      </Row>

      <Group spacing={0}>
        {results.map((name, i) => (
          <Dataset key={name} name={name} last={i == results.length - 1} />
        ))}
      </Group>
    </>
  )
}

const Filters = ({ sx }) => {
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
      // [LABEL_MAP.day]: filters.timescale === 'day',
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

  return (
    <>
      <Row columns={[6, 8, 4, 4]}>
        <Column start={1} width={[2, 2, 1, 1]} sx={sx.label}>
          Variable
        </Column>
        <Column start={[3, 3, 2, 2]} width={[4, 6, 3, 3]}>
          <TooltipWrapper
            tooltip='Select climate variable to show in the map.  TASMAX and TASMIN are maximum and minimum near-surface temperature and PR is precipitation.
'
          >
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
          </TooltipWrapper>
        </Column>
      </Row>
      <Row columns={[6, 8, 4, 4]}>
        <Column start={1} width={[2, 2, 1, 1]} sx={sx.label}>
          Timescale
        </Column>
        <Column start={[3, 3, 2, 2]} width={[4, 6, 3, 3]}>
          <TooltipWrapper tooltip='Select whether to view data at a yearly or monthly timestep.'>
            <Filter
              values={timescaleFilter}
              setValues={(obj) => {
                const timescale = Object.keys(LABEL_MAP).find(
                  (k) => obj[LABEL_MAP[k]]
                )
                setFilters({ timescale })
              }}
            />
          </TooltipWrapper>
        </Column>
      </Row>
      <Row columns={[6, 8, 4, 4]}>
        <Column start={1} width={[2, 2, 1, 1]} sx={sx.label}>
          Scenarios
        </Column>
        <Column start={[3, 3, 2, 2]} width={[4, 6, 3, 3]}>
          <TooltipWrapper tooltip='Select whether to view historical data or future data from Shared Socioeconomic Pathways (SSPs) representing different levels of warming.'>
            <Flex sx={{ flexDirection: 'column' }}>
              <Filter
                values={historicalFilter}
                setValues={(obj) => {
                  const historical = obj[LABEL_MAP.historical]
                  const {
                    historical: previousHistorical,
                    ...previousScenarios
                  } = filters.experiment
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
              <Filter
                values={scenarioFilter}
                setValues={(obj) => {
                  const scenarioSelected = Object.keys(obj).some((k) => obj[k])
                  const { historical: previousHistorical } = filters.experiment
                  const historical = scenarioSelected
                    ? false
                    : previousHistorical

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
            </Flex>
          </TooltipWrapper>
        </Column>
      </Row>

      <Row columns={[6, 8, 4, 4]}>
        <Column start={1} width={[2, 2, 1, 1]} sx={sx.label}>
          GCMs
        </Column>
        <Column start={[3, 3, 2, 2]} width={[4, 6, 3, 3]}>
          <TooltipWrapper tooltip='Select the global climate model (GCM) used in the creation of the dataset.'>
            <ExpandableFilter
              values={filters.gcm}
              setValues={(obj) => {
                setFilters({ gcm: obj })
              }}
              multiSelect
            />
          </TooltipWrapper>
        </Column>
      </Row>
      <Row columns={[6, 8, 4, 4]}>
        <Column start={1} width={[2, 2, 1, 1]} sx={sx.label}>
          Methods
        </Column>
        <Column start={[3, 3, 2, 2]} width={[4, 6, 3, 3]}>
          <TooltipWrapper tooltip='Select the downscaling method used to derive the dataset.'>
            <Filter
              values={filters.method}
              setValues={(obj) => {
                setFilters({ method: obj })
              }}
              multiSelect
            />
          </TooltipWrapper>
        </Column>
      </Row>
    </>
  )
}

const QuerySection = ({ sx }) => {
  const datasets = useDatasetsStore((state) => !!state.datasets)
  const fetchDatasets = useDatasetsStore((state) => state.fetchDatasets)

  useEffect(() => {
    if (!datasets) {
      fetchDatasets()
    }
  }, [])

  return (
    <Box>
      <Box sx={sx.heading}>Datasets</Box>

      {datasets ? (
        <>
          <Filters sx={sx} />
          <Divider sx={{ my: 4 }} />
          <Results sx={sx} />
        </>
      ) : (
        <Spinner sx={{ color: 'secondary' }} duration={750} size={28} />
      )}
    </Box>
  )
}

export default QuerySection
