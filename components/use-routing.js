import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useDatasetsStore } from './datasets'

const validateQuery = (query, datasets) => {
  const {
    active,
    var: variable,
    scale,
    t, // displayTime value
    scenarios, // experiment value
  } = query

  if (!datasets[active]) {
    return false
  }

  if (!['tasmax', 'tasmin', 'pr'].includes(variable)) {
    return false
  }

  if (!['year', 'month', 'day'].includes(scale)) {
    return false
  }

  if (
    !['historical', 'ssp245', 'ssp370', 'ssp585'].some((s) =>
      scenarios.includes(s)
    )
  ) {
    return false
  }

  const [year, month, day] = t.split('-')
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
        const { t, scenarios } = query
        const [year, month, day] = t.split('-')

        const filters = {
          variable: query.var,
          timescale: query.scale,
          experiment: {
            historical: scenarios.includes('historical'),
            ssp245: scenarios.includes('ssp245'),
            ssp370: scenarios.includes('ssp370'),
            ssp585: scenarios.includes('ssp585'),
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
      const { center, zoom } = router.query
      const query = {
        ...(center ? { center } : {}),
        ...(zoom ? { zoom } : {}),
        ...(active ? { active } : {}),
        ...(displayTime
          ? { t: `${displayTime.year}-${displayTime.month}-${displayTime.day}` }
          : {}),
        ...(experiment
          ? {
              scenarios: Object.keys(experiment)
                .filter((k) => experiment[k])
                .join(','),
            }
          : {}),
        ...(variable ? { var: variable } : {}),
        ...(timescale ? { scale: timescale } : {}),
      }

      router.replace({ pathname: '', query }, null, {
        shallow: true,
      })
    }
  }, [initialized, active, displayTime, variable, timescale, experiment])
}

export default useRouting
