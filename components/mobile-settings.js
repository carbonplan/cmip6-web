import { Box, Flex } from 'theme-ui'
import { Column, Row } from '@carbonplan/components'

const MobileSettings = ({ expanded, footer, children }) => {
  return (
    <Box
      sx={{
        height: 'calc(100%)',
        position: 'fixed',
        width: 'calc(100vw)',
        top: 0,
        left: 0,
        mt: '56px',
        zIndex: 1100,
        borderStyle: 'solid',
        borderColor: 'muted',
        borderWidth: '0px',
        borderBottomWidth: '1px',
        transition: 'transform 0.15s',
        transform: expanded ? 'translateY(0)' : 'translateY(-100%)',
      }}
    >
      <Flex
        sx={{
          flexDirection: 'column',
          height: '100%',
          pb: '56px',
          bg: 'background',
        }}
      >
        <Box
          sx={{
            flex: '1 1 auto',
            overflow: 'hidden',
            px: [4, 5, 5, 6],
          }}
        >
          <Row
            sx={{
              flex: '0 0 auto',
              height: '100%',
              overflowX: 'hidden',
              overflowY: 'scroll',
              py: [4],
              px: [4, 5, 5, 6],
              mx: [-4, -5, -5, -6],
            }}
          >
            <Column start={[1, 1, 1, 1]} width={[6, 8, 10, 10]}>
              {children}
            </Column>
          </Row>
        </Box>
        {footer && (
          <Box sx={{ flex: '0 0 auto', px: [4, 5, 5, 6] }}>{footer}</Box>
        )}
      </Flex>
    </Box>
  )
}

export default MobileSettings
