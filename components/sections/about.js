import { Box } from 'theme-ui'

const AboutSection = ({ sx }) => {
  return (
    <Box>
      <Box sx={sx.heading}>About</Box>

      <Box sx={sx.description}>
        <Box sx={{ mb: 2 }}>
          These data products and the website were developed jointly by the
          following contributors (in alphabetical order): Anderson Banihirwe,
          Oriana Chegwidden, Cindy Chiao, Jeremy Freeman, Raphael Hagen, Joe
          Hamman, Kata Martin.
        </Box>

        <Box>
          The development of this project was funded, in part, through a grant
          from the Microsoft AI for Earth program to CarbonPlan.
        </Box>
      </Box>
    </Box>
  )
}

export default AboutSection
