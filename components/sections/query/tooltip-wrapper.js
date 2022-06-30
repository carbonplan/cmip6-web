import { Box, Flex } from 'theme-ui'
import { useState } from 'react'
import AnimateHeight from 'react-animate-height'

import Tooltip from '../../tooltip'

const TooltipWrapper = ({ children, tooltip, mt = '6px' }) => {
  const [expanded, setExpanded] = useState(false)

  return (
    <>
      <Flex sx={{ justifyContent: 'space-between', alignItems: 'flex-start' }}>
        {children}
        <Tooltip
          expanded={expanded}
          setExpanded={setExpanded}
          sx={{ mt: mt, flexShrink: 0 }}
        />
      </Flex>
      <AnimateHeight
        duration={100}
        height={expanded ? 'auto' : 0}
        easing={'linear'}
      >
        <Box sx={{ my: 1, fontSize: [1, 1, 1, 2] }}>{tooltip}</Box>
      </AnimateHeight>
    </>
  )
}

export default TooltipWrapper
