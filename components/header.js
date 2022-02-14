import { Box, Container, Spinner } from 'theme-ui'
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
          />
        </Container>
      </Box>
      <Box
        sx={{
          pointerEvents: 'none',
          position: 'relative',
          left: '520px',
          top: '16px',
          width: '24px',
          opacity: initiallyLoading || loading ? 1 : 0,
          transition: 'opacity 0.05s',
          zIndex: 1001,
        }}
      >
        <Spinner duration={750} size={32} />
      </Box>
      <Box
        sx={{
          position: 'absolute',
          pointerEvents: 'none',
          width: '100%',
          left: '0px',
          top: '0px',
          height: 'calc(100vh)',
          opacity: updatingTime ? 0.5 : 0,
          transition: 'opacity 0.15s',
          bg: 'background',
          zIndex: 1000,
        }}
      />
      <Box
        sx={{
          position: 'relative',
          pointerEvents: 'none',
          left: '520px',
          top: '-16px',
          opacity: updatingTime ? 0.5 : 0,
          transition: 'opacity 0.15s',
          zIndex: 1000,
          fontFamily: 'mono',
          letterSpacing: 'mono',
          textTransform: 'uppercase',
          fontSize: [1, 1, 1, 2],
        }}
      >
        Release to update
      </Box>
    </>
  )
}

export default Header
