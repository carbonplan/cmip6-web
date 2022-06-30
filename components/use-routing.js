import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useDatasetsStore } from './datasets'
import { encodeJSON, decodeHex } from './utils'

const DEFAULT_ACTIVE =
  'ScenarioMIP.CCCma.CanESM5.ssp245.r1i1p1f1.day.DeepSD-BC.tasmax.year'

const validateQuery = (query, datasets) => {
  const {
    active,
    // t, // displayTime value
    filters: {
      t: scale,
      v: variable,
      s: scenarios, // experiment value
    },
  } = query

  if (active && !datasets[active]) {
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

  // const [year, month, day] = t.split('-')
  // if (!year || !month || !day) {
  //   return false
  // }

  return true
}

const getFilterHex = ({ variable, timescale, experiment }) => {
  const filters = {
    ...(experiment
      ? {
          s: Object.keys(experiment)
            .filter((k) => experiment[k])
            .join(','),
        }
      : {}),
    ...(variable ? { v: variable } : {}),
    ...(timescale ? { t: timescale } : {}),
  }

  return encodeJSON(filters)
}

// Listens for changes in datasets zustand store and updates the query
// parameters of the url.
const useRouting = () => {
  const router = useRouter()
  const datasets = useDatasetsStore((state) => state.datasets)
  const active = useDatasetsStore((state) => state.active)
  //const displayTime = useDatasetsStore((state) => state.displayTime)
  const variable = useDatasetsStore((state) => state.filters?.variable)
  const timescale = useDatasetsStore((state) => state.filters?.timescale)
  const experiment = useDatasetsStore((state) => state.filters?.experiment)
  const setActive = useDatasetsStore((state) => state.setActive)
  //const setDisplayTime = useDatasetsStore((state) => state.setDisplayTime)
  const setFilters = useDatasetsStore((state) => state.setFilters)

  const initialized = !!datasets

  // Sets values in the store based on the initial URL parameters
  useEffect(() => {
    if (router.isReady && initialized) {
      const { query } = router

      const filters = query.f ? decodeHex(query.f) : {}
      const decryptedQuery = { ...query, filters }

      if (validateQuery(decryptedQuery, datasets)) {
        // const { t } = decryptedQuery
        // const [year, month, day] = t.split('-')

        const computedFilters = {
          variable: filters.v,
          timescale: filters.t,
          experiment: {
            historical: filters.s.includes('historical'),
            ssp245: filters.s.includes('ssp245'),
            ssp370: filters.s.includes('ssp370'),
            ssp585: filters.s.includes('ssp585'),
          },
        }

        datasets[decryptedQuery.active] && setActive(decryptedQuery.active)
        setFilters(computedFilters)
        // setDisplayTime({ year, month, day })
      } else {
        setActive(DEFAULT_ACTIVE)
      }
    }
  }, [initialized, router.isReady])

  // Update the URL when the active dataset, display time, or filters change.
  useEffect(() => {
    if (initialized) {
      const { center, zoom } = router.query
      const query = {
        ...(center ? { center } : {}),
        ...(zoom ? { zoom } : {}),
        ...(active ? { active } : {}),
        // ...(displayTime
        //   ? {
        //       t: `${displayTime.year}-${displayTime.month}-${displayTime.day}`,
        //     }
        //   : {}),
        f: getFilterHex({ variable, timescale, experiment }),
      }

      router.replace({ pathname: '', query }, null, {
        shallow: true,
      })
    }
  }, [initialized, active, variable, timescale, experiment])
}

export default useRouting
