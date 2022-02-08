import { Box } from 'theme-ui'
import { alpha } from '@theme-ui/color'

const spacing = {
  py: [4],
  my: [-4],
  px: [4, 5, 5, 6],
  mx: [-4, -5, -5, -6],
}
export const Section = ({ children, sx, hoverable = false }) => {
  const hoverableSx = hoverable
    ? {
        bg: 'transparent',
        transition: 'background-color 0.15s',
        '@media (hover: hover) and (pointer: fine)': {
          '&:hover': { bg: alpha('muted', 0.1) },
        },
      }
    : {}
  return (
    <Box
      sx={{
        ...spacing,
        ...sx,
        ...hoverableSx,
      }}
    >
      {children}
    </Box>
  )
}

export default Section
