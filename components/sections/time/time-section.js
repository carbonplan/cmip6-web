import { Group, Slider } from '@carbonplan/components'
import { Box, Flex } from 'theme-ui'

import DoubleSlider from './double-slider'
import { useDatasetsStore } from '../../datasets'
import Section from '../../section'

const TimeSection = ({ sx }) => {
  const { display, range } = useDatasetsStore((state) => state.time)
  const setTime = useDatasetsStore((state) => state.setTime)

  return (
    <Section sx={sx.heading} label='Time'>
      <Group>
        <DoubleSlider
          min={0}
          max={300}
          start={range.min}
          end={range.max}
          minWidth={30}
          maxWidth={100}
          setStart={(v) =>
            setTime({ display: Math.max(v, display), range: { min: v } })
          }
          setEnd={(v) =>
            setTime({ display: Math.min(v, display), range: { max: v } })
          }
        />
        <Box>
          <Slider
            value={display}
            min={range.min}
            max={range.max}
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
            <Box sx={{ mr: '-10px' }}>{display}</Box>
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
