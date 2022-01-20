import { Box } from 'theme-ui'

const EyeOpen = ({ ...props }) => {
  const style = { vectorEffect: 'non-scaling-stroke' }
  return (
    <Box
      as='svg'
      viewBox='0 0 24 24'
      fill='none'
      width='24'
      height='24'
      stroke='currentColor'
      stroke-width='1.5'
      {...props}
    >
      <path d='M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z'></path>
      <circle fill='currentColor' cx='12' cy='12' r='3'></circle>
    </Box>
  )
}

//<circle cx='13' cy='13' r='12' style={style} />

export default EyeOpen
