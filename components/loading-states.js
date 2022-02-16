import { Box, Spinner } from 'theme-ui'
import { SidebarAttachment } from '@carbonplan/layouts'
import { useDatasetsStore } from './datasets'

const LoadingStates = ({ expanded, loading }) => {
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
      <SidebarAttachment
        expanded={expanded}
        side='left'
        width={4}
        sx={{
          top: '16px',
          width: '24px',
          opacity:
            (initiallyLoading || loading) && !updatingTime && expanded ? 1 : 0,
          transition: 'opacity 0.05s',
          zIndex: 1001,
        }}
      >
        <Spinner duration={750} size={32} />
      </SidebarAttachment>

      <SidebarAttachment
        expanded={expanded}
        side='left'
        width={4}
        sx={{
          top: '22px',
          opacity: updatingTime ? 0.5 : 0,
          transition: 'opacity 0.15s',
          fontFamily: 'mono',
          letterSpacing: 'mono',
          textTransform: 'uppercase',
          fontSize: [1, 1, 1, 2],
        }}
      >
        Release to update
      </SidebarAttachment>

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
    </>
  )
}

export default LoadingStates
