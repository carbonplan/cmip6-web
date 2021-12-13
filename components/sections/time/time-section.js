import { useEffect, useMemo, useState } from 'react'
import zarr from 'zarr-js'

import { useDatasetsStore } from '../../datasets'

import Inputs from './inputs'
import Section from '../../section'

const useDateStrings = (dataset) => {
  const dateStrings = useDatasetsStore((state) => state.dateStrings)
  const setDateStrings = useDatasetsStore((state) => state.setDateStrings)
  const source = useDatasetsStore((state) => state.datasets[dataset].source)

  useEffect(() => {
    if (!dateStrings.loading && !dateStrings.value) {
      setDateStrings({ loading: true })
      zarr().load(`${source}/0/date_str`, (err, array) => {
        setDateStrings({ loading: false, value: Array.from(array.data) })
      })
    }
  }, [dateStrings.loading, !dateStrings.value, source])

  return dateStrings
}

const DATESTRING_DATASETS = {
  daily: 'CMIP.AWI.AWI-ESM-1-1-LR',
}
const TimeSection = ({ sx }) => {
  const timescale = useDatasetsStore((state) => state.filters.timescale)
  const dateStrings = useDateStrings(DATESTRING_DATASETS[timescale])

  if (dateStrings.loading || !dateStrings.value) {
    return 'Loading...'
  }

  return (
    <Section sx={sx.heading} label='Time'>
      <Inputs dateStrings={dateStrings.value} />
    </Section>
  )
}

export default TimeSection
