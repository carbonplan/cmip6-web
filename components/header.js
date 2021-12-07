import { Box, Container } from 'theme-ui'
import { Meta, Guide, Header as HeaderComponent } from '@carbonplan/components'

const Header = ({ loading }) => {
  return (
    <>
      <Meta
        card={'https://images.carbonplan.org/social/maps-demo.png'}
        description={'TK'}
        title={'CMIP6 downscaling / research / carbonplan'}
      />

      <Container>
        <Guide color='teal' />
      </Container>

      <Box sx={{ position: 'absolute', top: 0, width: '100%', zIndex: 5000 }}>
        <Container>
          <HeaderComponent dimmer='top' status={loading ? 'loading' : null} />
        </Container>
      </Box>
    </>
  )
}

export default Header
