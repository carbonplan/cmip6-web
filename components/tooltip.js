import { IconButton } from 'theme-ui'
import { Info } from '@carbonplan/icons'

const Tooltip = ({ expanded, setExpanded, sx }) => {
  return (
    <IconButton
      onClick={() => setExpanded(!expanded)}
      role='checkbox'
      aria-checked={expanded}
      aria-label='Information'
      sx={{
        cursor: 'pointer',
        height: '16px',
        width: '16px',
        '@media (hover: hover) and (pointer: fine)': {
          '&:hover > #info': {
            stroke: 'primary',
          },
        },
        p: [0],
        transform: 'translate(0px, -3.75px)',
        ...sx,
      }}
    >
      <Info
        id='info'
        height='16px'
        width='16px'
        sx={{
          stroke: expanded ? 'primary' : 'secondary',
          transition: '0.1s',
        }}
      />
    </IconButton>
  )
}

export default Tooltip
