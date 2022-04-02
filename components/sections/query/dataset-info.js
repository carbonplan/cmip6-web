import { useState } from 'react'

import { Column, Row, Button } from '@carbonplan/components'
import { Down } from '@carbonplan/icons'
import { Box, Flex } from 'theme-ui'

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
    mb: 1,
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
      <Column start={1} width={[6, 8, 4, 4]} sx={{ py: 3 }}>
        <Flex sx={{ gap: [4, 5, 5, 6], mb: 3 }}>
          {dataset.era5 && (
            <Box>
              <Box sx={sx.index}>Reanalysis</Box>
              <Box sx={sx.entry}>ERA5</Box>
            </Box>
          )}

          <Box>
            <Box sx={sx.index}>Institution</Box>
            <Box sx={sx.entry}>{dataset.institution}</Box>
          </Box>
          {dataset.member && (
            <Box>
              <Box sx={sx.index}>Member</Box>
              <Box sx={sx.entry}>{dataset.member}</Box>
            </Box>
          )}
          <Box>
            <Box sx={sx.index}>Aggregation</Box>
            <Box sx={sx.entry}>{dataset.aggregation}</Box>
          </Box>
        </Flex>
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
  )
}

export default DatasetInfo
