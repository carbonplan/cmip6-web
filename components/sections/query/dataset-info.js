import { useState } from 'react'

import { Column, Row, Button } from '@carbonplan/components'
import { Down } from '@carbonplan/icons'
import { Box } from 'theme-ui'

const getSx = (color) => ({
  row: {
    borderStyle: 'solid',
    borderWidth: '0px',
    borderColor: color,
    borderBottomWidth: '1px',
    mb: ['2px'],
  },
  index: {
    textTransform: 'uppercase',
    color,
    fontFamily: 'faux',
    letterSpacing: 'faux',
    fontSize: [1, 1, 1, 2],
  },
  entry: {
    fontSize: [1, 1, 1, 2],
    fontFamily: 'faux',
    letterSpacing: 'faux',
  },
})
const DatasetInfo = ({ dataset, color }) => {
  const [copied, setCopied] = useState(false)
  const [tick, setTick] = useState(false)
  const sx = getSx(color)

  const handleClick = () => {
    const blank = document.createElement('textarea')
    document.body.appendChild(blank)

    if (dataset.original_dataset_uris.length === 1) {
      blank.value = dataset.original_dataset_uris[0]
    } else {
      blank.value = `[${dataset.original_dataset_uris
        .map((uri) => `"${uri}"`)
        .join(', ')}]`
    }
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

  let copyText = 'Copy Zarr store link'

  if (copied) {
    copyText = 'Copied!'
  } else if (dataset.original_dataset_uris.length > 1) {
    copyText = 'Copy Zarr store links'
  }

  return (
    <Row columns={[6, 8, 4, 4]}>
      <Column start={1} width={[6, 8, 4, 4]} sx={{ pt: 1 }}>
        <Box as='table' sx={{ display: 'block' }}>
          <Box as='tbody' sx={{ display: 'block' }}>
            {dataset.era5 && (
              <Row as='tr' columns={[6, 8, 4, 4]} sx={sx.row}>
                <Column as='td' start={[1]} width={[3, 2, 2, 2]} sx={sx.index}>
                  Reanalysis
                </Column>
                <Column
                  as='td'
                  start={[4, 3, 3, 3]}
                  width={[3, 2, 2, 2]}
                  sx={sx.entry}
                >
                  ERA5
                </Column>
              </Row>
            )}
            <Row as='tr' columns={[6, 8, 4, 4]} sx={sx.row}>
              <Column as='td' start={[1]} width={[3, 2, 2, 2]} sx={sx.index}>
                Institution
              </Column>
              <Column
                as='td'
                start={[4, 3, 3, 3]}
                width={[3, 2, 2, 2]}
                sx={sx.entry}
              >
                {dataset.institution}
              </Column>
            </Row>
            {dataset.member && (
              <Row as='tr' columns={[6, 8, 4, 4]} sx={sx.row}>
                <Column as='td' start={[1]} width={[3, 2, 2, 2]} sx={sx.index}>
                  Member
                </Column>
                <Column
                  as='td'
                  start={[4, 3, 3, 3]}
                  width={[3, 2, 2, 2]}
                  sx={sx.entry}
                >
                  {dataset.member}
                </Column>
              </Row>
            )}{' '}
            <Row as='tr' columns={[6, 8, 4, 4]} sx={sx.row}>
              <Column as='td' start={[1]} width={[3, 2, 2, 2]} sx={sx.index}>
                Aggregation
              </Column>
              <Column
                as='td'
                start={[4, 3, 3, 3]}
                width={[3, 2, 2, 2]}
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
                    fontSize: [1, 1, 1, 2],
                    color,
                    '@media (hover: hover) and (pointer: fine)': {
                      '&:hover': {
                        color,
                      },
                    },
                  }}
                  onClick={handleClick}
                  size='xs'
                >
                  {copyText}
                </Button>
              </Column>
            </Row>
          </Box>
        </Box>
      </Column>
    </Row>
  )
}

export default DatasetInfo
