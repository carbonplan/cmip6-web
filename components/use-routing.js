import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useDatasetsStore } from './datasets'

// Listens for changes in datasets zustand store and updates the query
// parameters of the url.
const useRouting = () => {
  const router = useRouter()
  const initialized = useDatasetsStore((state) => !!state.datasets)
  const { name: active, dateStrings } =
    useDatasetsStore(
      (state) => state.datasets && state.datasets[state.active]
    ) || {}
  const displayTime = useDatasetsStore((state) => state.displayTime)
  const setActive = useDatasetsStore((state) => state.setActive)
  const setDisplayTime = useDatasetsStore((state) => state.setDisplayTime)

  // Sets values in the store based on the initial URL parameters
  useEffect(() => {
    if (router.isReady && initialized) {
      const { active, year, month, day } = router.query
      if (active) {
        setActive(active)
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
      }

      router.replace({ pathname: '', query }, null, {
        shallow: true,
      })
    }
  }, [initialized, active, displayTime])
}

export default useRouting
