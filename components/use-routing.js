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

  useEffect(() => {
    if (initialized) {
      const query = {
        ...(active ? { active } : {}),
        ...(displayTime ? displayTime : {}),
      }

      router.replace({ pathname: '', query }, null, {
        shallow: true,
      })

      console.log({ active, displayTime })
    }
  }, [initialized, active, displayTime])
}

export default useRouting
