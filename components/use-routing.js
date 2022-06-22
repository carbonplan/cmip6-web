import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useDatasetsStore } from './datasets'
import { generateKey, encryptMessage, decryptHex } from './utils'

const validateQuery = (query, datasets) => {
  const {
    active,
    t, // displayTime value
    filters: {
      scale,
      var: variable,
      scenarios, // experiment value
    },
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

const getFilterHex = ({ variable, timescale, experiment }, publicKey) => {
  console.log('generating hex')
  const filters = {
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

  console.log(JSON.stringify(filters))
  return encryptMessage(JSON.stringify(filters), publicKey)
}

// Listens for changes in datasets zustand store and updates the query
// parameters of the url.
const useRouting = () => {
  const [{ privateKey, publicKey }, setKeys] = useState({})
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

  useEffect(() => {
    generateKey().then((v) => setKeys(v))
  }, [])

  const initialized = !!datasets

  // Sets values in the store based on the initial URL parameters
  useEffect(() => {
    if (router.isReady && initialized && privateKey) {
      const { query } = router

      // console.log('decrypted', decryptHex(privateKey, query.f))
      const filters = query.f
        ? JSON.parse(decryptHex(privateKey, query.f) ?? '{}')
        : {}
      const decryptedQuery = { ...query, filters }

      if (validateQuery(decryptedQuery, datasets)) {
        const { t } = decryptedQuery
        const [year, month, day] = t.split('-')

        const computedFilters = {
          variable: filters.var,
          timescale: filters.scale,
          experiment: {
            historical: filters.scenarios.includes('historical'),
            ssp245: filters.scenarios.includes('ssp245'),
            ssp370: filters.scenarios.includes('ssp370'),
            ssp585: filters.scenarios.includes('ssp585'),
          },
        }

        setFilters(computedFilters)
        setActive(decryptedQuery.active)
        setDisplayTime({ year, month, day })
      }
    }
  }, [initialized, router.isReady, privateKey])

  // Update the URL when the active dataset, display time, or filters change.
  useEffect(() => {
    if (initialized && publicKey) {
      console.log('up here')
      getFilterHex({ variable, timescale, experiment }, publicKey).then(
        (filterHex) => {
          console.log('in here')
          const { center, zoom } = router.query
          const query = {
            ...(center ? { center } : {}),
            ...(zoom ? { zoom } : {}),
            ...(active ? { active } : {}),
            ...(displayTime
              ? {
                  t: `${displayTime.year}-${displayTime.month}-${displayTime.day}`,
                }
              : {}),
            ...(variable && timescale && experiment ? { f: filterHex } : {}),
          }

          router.replace({ pathname: '', query }, null, {
            shallow: true,
          })
        }
      )
    }
  }, [
    initialized,
    active,
    displayTime,
    variable,
    timescale,
    experiment,
    publicKey,
  ])
}

export default useRouting
