import { Box, Container } from 'theme-ui'
import {
  Meta,
  Guide,
  Dimmer,
  Header as HeaderComponent,
} from '@carbonplan/components'
import { useDatasetsStore } from './datasets'

const Header = ({ loading }) => {
  const initiallyLoading = useDatasetsStore(
    (state) =>
      !state.datasets ||
      Object.keys(state.datasets).some(
        (name) => state.datasets[name].selected && !state.datasets[name].loaded
      )
  )
  const updatingTime = useDatasetsStore((state) => state.updatingTime)

  let status = null
  if (initiallyLoading || loading) {
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
