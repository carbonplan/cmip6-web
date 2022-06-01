import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useDatasetsStore } from './datasets'

const validateQuery = (query, datasets) => {
  const {
    active,
    variable,
    timescale,
    // displayTime values
    year,
    month,
    day,
    // experiment values
    historical,
    ssp245,
    ssp370,
    ssp585,
  } = query

  if (!datasets[active]) {
    return false
  }

  if (!['tasmax', 'tasmin', 'pr'].includes(variable)) {
    return false
  }

  if (!['year', 'month', 'day'].includes(timescale)) {
    return false
  }

  if (![historical, ssp245, ssp370, ssp585].some((d) => d === 'true')) {
    return false
  }

  if (!year || !month || !day) {
    return false
  }

  return true
}

// Listens for changes in datasets zustand store and updates the query
// parameters of the url.
const useRouting = () => {
  const router = useRouter()
  const datasets = useDatasetsStore((state) => state.datasets)
  const active = useDatasetsStore((state) => state.active)
  const displayTime = useDatasetsStore((state) => state.displayTime)
  const variable = useDatasetsStore((state) => state.filters?.variable)
  const timescale = useDatasetsStore((state) => state.filters?.timescale)
  const experiment = useDatasetsStore((state) => state.filters?.experiment)
  const setActive = useDatasetsStore((state) => state.setActive)
  const setDisplayTime = useDatasetsStore((state) => state.setDisplayTime)
  const setFilters = useDatasetsStore((state) => state.setFilters)

  const initialized = !!datasets
  // Sets values in the store based on the initial URL parameters
  useEffect(() => {
    if (router.isReady && initialized) {
      const { query } = router

      if (validateQuery(query, datasets)) {
        const {
          // displayTime values
          year,
          month,
          day,
          // experiment values
          historical,
          ssp245,
          ssp370,
          ssp585,
        } = query

        const filters = {
          variable: query.variable,
          timescale: query.timescale,
          experiment: {
            historical: historical === 'true',
            ssp245: ssp245 === 'true',
            ssp370: ssp370 === 'true',
            ssp585: ssp585 === 'true',
          },
        }

        setFilters(filters)
        setActive(query.active)
        setDisplayTime({ year, month, day })
      }
    }
  }, [initialized, router.isReady])

  // Update the URL when the active dataset changes or the display time changes.
  useEffect(() => {
    if (initialized) {
      const query = {
        ...(active ? { active } : {}),
        ...(displayTime ? displayTime : {}),
        ...(experiment ? experiment : {}),
        ...(variable ? { variable } : {}),
        ...(timescale ? { timescale } : {}),
      }

      router.replace({ pathname: '', query }, null, {
        shallow: true,
      })
    }
  }, [initialized, active, displayTime, variable, timescale, experiment])
}

export default useRouting
