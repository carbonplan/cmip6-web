import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useDatasetsStore } from './datasets'

// Listens for changes in datasets zustand store and updates the query
// parameters of the url.
const useRouting = () => {
  const router = useRouter()
  const initialized = useDatasetsStore((state) => !!state.datasets)
  const active = useDatasetsStore((state) => state.active)
  const displayTime = useDatasetsStore((state) => state.displayTime)
  const variable = useDatasetsStore((state) => state.filters?.variable)
  const timescale = useDatasetsStore((state) => state.filters?.timescale)
  const experiment = useDatasetsStore((state) => state.filters?.experiment)
  const setActive = useDatasetsStore((state) => state.setActive)
  const setDisplayTime = useDatasetsStore((state) => state.setDisplayTime)
  const setFilters = useDatasetsStore((state) => state.setFilters)

  // Sets values in the store based on the initial URL parameters
  useEffect(() => {
    if (router.isReady && initialized) {
      const { query } = router
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
        ...(query.variable ? { variable: query.variable } : {}),
        ...(query.timescale ? { timescale: query.timescale } : {}),
        ...(historical || ssp245 || ssp370 || ssp585
          ? {
              experiment: {
                historical: historical === 'true',
                ssp245: ssp245 === 'true',
                ssp370: ssp370 === 'true',
                ssp585: ssp585 === 'true',
              },
            }
          : {}),
      }

      if (Object.keys(filters).length > 0) {
        setFilters(filters)
      }

      if (query.active) {
        setActive(query.active)
      }

      if (year && month && day) {
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
