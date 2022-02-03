import { Box } from 'theme-ui'
import { useCallback, useState } from 'react'
import { Expander } from '@carbonplan/components'
import AnimateHeight from 'react-animate-height'

import Section from './section'

export const CollapsibleSection = ({
  children,
  label,
  onClose,
  onOpen,
  sx,
  sxLabel,
  defaultExpanded = false,
  color = 'primary',
  expander = 'right',
}) => {
  const [showSection, setShowSection] = useState(defaultExpanded)

  const handleClick = useCallback(() => {
    setShowSection((previouslyShown) => {
      if (previouslyShown && onClose) onClose()
      if (!previouslyShown && onOpen) onOpen()
      return !previouslyShown
    })
  }, [onClose, onOpen])

  const content = [
    <Box key='label' as='span' sx={{ ml: expander === 'left' ? 2 : undefined }}>
      {label}
    </Box>,
    <Expander
      key='expander'
      value={showSection}
      id='section-expander'
      sx={{
        width: '24px',
        mt: ['-1px'],
        position: 'relative',
        stroke: color,
        transition: 'stroke 0.15s',
        '@media (hover: hover) and (pointer: fine)': {
          '&:hover': {
            stroke: color,
          },
        },
      }}
    />,
  ]

  if (expander === 'left') {
    content.reverse()
  }

  return (
    <Section sx={sx}>
      <Box
        sx={{
          ...sxLabel,
          my: 0,
          display: 'flex',
          justifyContent: expander === 'right' ? 'space-between' : undefined,
          cursor: 'pointer',
          color,
        }}
        onClick={handleClick}
      >
        {content}
      </Box>

      <AnimateHeight
        duration={150}
        height={showSection && children ? 'auto' : 0}
        easing={'linear'}
        style={{ pointerEvents: 'none' }}
      >
        <Box sx={{ pt: [3], pb: [1] }}>
          <Box sx={{ pointerEvents: 'all' }}>{children || null}</Box>
        </Box>
      </AnimateHeight>
    </Section>
  )
}

export default CollapsibleSection
