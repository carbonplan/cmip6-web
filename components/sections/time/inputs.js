import { Group, Slider } from '@carbonplan/components'
import { Box, Flex } from 'theme-ui'
import { useEffect } from 'react'
import zarr from 'zarr-js'

import RangeSlider from './range-slider'
import { useDatasetsStore } from '../../datasets'
import { useState } from 'react'

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

const Inputs = ({ sx }) => {
  const { display, range } = useDatasetsStore((state) => state.time)
  const [showDisplay, setShowDisplay] = useState(false)
  const setTime = useDatasetsStore((state) => state.setTime)
  const dateStrings = useDateStrings('CMIP.AWI.AWI-ESM-1-1-LR')

  if (dateStrings.loading || !dateStrings.value) {
    return 'Loading...'
  }

  return (
    <Group>
      <Box>
        <RangeSlider
          min={0}
          max={300}
          start={range.min}
          width={30}
          value={display}
          setStart={(v) => {
            const min = v
            const max = v + 30
            setTime({
              display: Math.min(Math.max(min, display), max),
              range: { min, max },
            })
          }}
        />
        <Flex sx={{ justifyContent: 'space-between' }}>
          <Box>{dateStrings.value[0]}</Box>
          <Box>{dateStrings.value[300]}</Box>
        </Flex>
      </Box>

      <Box>
        <Slider
          value={display}
          min={range.min}
          max={range.max}
          onMouseDown={() => setShowDisplay(true)}
          onMouseUp={() => setShowDisplay(false)}
          step={1}
          onChange={(e) => setTime({ display: parseFloat(e.target.value) })}
        />
        <Flex
          sx={{
            height: 0,
            width: `calc(${display - range.min} * 100% / ${
              range.max - range.min
            } )`,
            justifyContent: 'flex-end',
          }}
        >
          <Box
            sx={{
              color: 'secondary',
              opacity: showDisplay ? 1 : 0,
              transition: '0.2s',
              mr: '-10px',
            }}
          >
            {dateStrings.value[display]}
          </Box>
        </Flex>
        <Flex sx={{ justifyContent: 'space-between' }}>
          <Box>{dateStrings.value[range.min]}</Box>
          <Box>{dateStrings.value[range.max]}</Box>
        </Flex>
      </Box>
    </Group>
  )
}

export default Inputs
