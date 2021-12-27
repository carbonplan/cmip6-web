import { Box, Container } from 'theme-ui'
import {
  Meta,
  Guide,
  Dimmer,
  Header as HeaderComponent,
} from '@carbonplan/components'
import { useTimeStore } from './time'

const Header = ({ loading }) => {
  const updatingTime = useTimeStore((state) => state.updatingTime)
  let status = null
  console.log({ updatingTime })
  if (loading) {
    status = 'loading'
  } else if (updatingTime) {
    status = 'release to update'
  }

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
          <HeaderComponent
            menuItems={[
              <Dimmer key='dimmer' sx={{ mt: '-2px', color: 'primary' }} />,
            ]}
            status={status}
          />
        </Container>
      </Box>
    </>
  )
}

export default Header
