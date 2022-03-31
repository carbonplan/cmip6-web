import { useState } from 'react'
import { alpha } from '@theme-ui/color'
import { Column, Row, Button } from '@carbonplan/components'
import { Down } from '@carbonplan/icons'
import { Box } from 'theme-ui'

const DatasetInfo = ({ dataset, color }) => {
  const [copied, setCopied] = useState(false)
  const [tick, setTick] = useState(false)

  const handleClick = () => {
    const blank = document.createElement('textarea')
    document.body.appendChild(blank)
    blank.value = dataset.original_dataset_uri
    blank.select()
    document.execCommand('copy')
    document.body.removeChild(blank)
    if (tick) clearTimeout(tick)
    setCopied(true)
    const timeout = setTimeout(() => {
      setCopied(false)
    }, 1000)
    setTick(timeout)
  }

  const sx = {
    row: {
      borderStyle: 'solid',
      borderWidth: '0px',
      borderColor: alpha(color, 0.25),
      borderBottomWidth: '1px',
      py: 2,
      mb: ['2px'],
    },
    index: {
      textTransform: 'uppercase',
      letterSpacing: 'smallcaps',
      color,
      fontFamily: 'heading',
      fontSize: [2, 2, 2, 3],
    },
    entry: {
      fontSize: [2, 2, 2, 3],
      fontFamily: 'faux',
      letterSpacing: 'faux',
      mb: ['1px'],
      mt: [2, 0, 0, 0],
    },
  }

  return (
    <Row columns={[6, 8, 4, 4]}>
      <Column
        start={1}
        width={[6, 8, 4, 4]}
        sx={{ bg: alpha(color, 0.25), my: 2, py: 1, px: '24px' }}
      >
        <Box as='table' sx={{ display: 'block' }}>
          <Box as='tbody' sx={{ display: 'block' }}></Box>
          <Row as='tr' columns={[6, 8, 4, 4]} sx={sx.row}>
            <Column as='td' start={[1]} width={[3, 2, 2, 2]} sx={sx.index}>
              Institution
            </Column>
            <Column
              as='td'
              start={[4, 3, 3, 3]}
              width={[3, 2, 2, 3]}
              sx={sx.entry}
            >
              {dataset.institution}
            </Column>
          </Row>
          <Row as='tr' columns={[6, 8, 4, 4]} sx={sx.row}>
            <Column as='td' start={[1]} width={[3, 2, 2, 2]} sx={sx.index}>
              Member
            </Column>
            <Column
              as='td'
              start={[4, 3, 3, 3]}
              width={[3, 2, 2, 3]}
              sx={sx.entry}
            >
              {dataset.member}
            </Column>
          </Row>
          <Row as='tr' columns={[6, 8, 4, 4]} sx={sx.row}>
            <Column as='td' start={[1]} width={[3, 2, 2, 2]} sx={sx.index}>
              Aggregation
            </Column>
            <Column
              as='td'
              start={[4, 3, 3, 3]}
              width={[3, 2, 2, 3]}
              sx={sx.entry}
            >
              {dataset.aggregation}
            </Column>
          </Row>
          <Row
            as='tr'
            columns={[6, 8, 4, 4]}
            sx={{ ...sx.row, borderBottomWidth: 0 }}
          >
            <Column as='td' start={1} width={[6, 8, 4, 4]} sx={sx.entry}>
              <Button
                prefix={<Down />}
                sx={{
                  color: alpha(color, 0.75),
                  '@media (hover: hover) and (pointer: fine)': {
                    '&:hover': {
                      color,
                    },
                  },
                }}
                onClick={handleClick}
                size='xs'
              >
                {copied ? 'Copied!' : 'Zarr store'}
              </Button>
            </Column>
          </Row>
        </Box>
      </Column>
    </Row>
  )
}

export default DatasetInfo
