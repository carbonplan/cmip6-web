import { Group, Slider } from '@carbonplan/components'
import { Box, Flex } from 'theme-ui'

import RangeSlider from './range-slider'
import { useDatasetsStore } from '../../datasets'
import Section from '../../section'
import { useState } from 'react'

const TimeSection = ({ sx }) => {
  const { display, range } = useDatasetsStore((state) => state.time)
  const [showDisplay, setShowDisplay] = useState(false)
  const setTime = useDatasetsStore((state) => state.setTime)

  return (
    <Section sx={sx.heading} label='Time'>
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
            <Box>0</Box>
            <Box>300</Box>
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
              {display}
            </Box>
          </Flex>
          <Flex sx={{ justifyContent: 'space-between' }}>
            <Box>{range.min}</Box>
            <Box>{range.max}</Box>
          </Flex>
        </Box>
      </Group>
    </Section>
  )
}

export default TimeSection
