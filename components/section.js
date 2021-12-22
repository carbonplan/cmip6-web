import { Box } from 'theme-ui'
import { alpha } from '@theme-ui/color'
import { useCallback, useState } from 'react'
import { Expander } from '@carbonplan/components'
import AnimateHeight from 'react-animate-height'

const spacing = {
  py: [4],
  my: [-4],
  px: [4, 5, 5, 6],
  mx: [-4, -5, -5, -6],
}
export const Section = ({
  children,
  label,
  onClose,
  onOpen,
  sx,
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
        color,
        position: 'relative',
        fill: color,
        stroke: color,
        transition: 'stroke 0.15s',
      }}
    />,
  ]

  if (expander === 'left') {
    content.reverse()
  }

  return (
    <Box
      sx={{
        ...spacing,
        bg: 'transparent',
        transition: 'background-color 0.15s',
        '@media (hover: hover) and (pointer: fine)': {
          '&:hover #section-expander': { stroke: 'primary' },
          '&:hover': { bg: alpha('muted', 0.1) },
        },
      }}
    >
      <Box
        sx={{
          ...sx,
          ...spacing,
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
    </Box>
  )
}

export default Section
