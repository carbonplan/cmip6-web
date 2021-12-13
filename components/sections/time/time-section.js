import { useEffect, useMemo, useState } from 'react'
import zarr from 'zarr-js'

import { useDatasetsStore } from '../../datasets'

import Inputs from './inputs'
import Section from '../../section'

const useDateStrings = (source) => {
  const dateStrings = useDatasetsStore((state) => state.dateStrings)
  const setDateStrings = useDatasetsStore((state) => state.setDateStrings)

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

const DATESTRING_SOURCES = {
  daily:
    'https://cmip6downscaling.blob.core.windows.net/scratch/cmip6-web-test-4/CMIP.AWI.AWI-ESM-1-1-LR.historical.day.gn/r1i1p1f1',
}
const TimeSection = ({ sx }) => {
  const timescale = useDatasetsStore((state) => state.filters.timescale)
  const dateStrings = useDateStrings(DATESTRING_SOURCES[timescale])

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
