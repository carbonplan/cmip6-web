import { useCallback, useState } from 'react'
import { Box, IconButton } from 'theme-ui'
import { Row, Column } from '@carbonplan/components'
import { ArrowThin } from '@carbonplan/icons'

const ControlPanel = ({
  children,
  tooltip,
  onClose,
  defaultExpanded = false,
  side = 'left',
  width = 3,
}) => {
  const [expanded, setExpanded] = useState(defaultExpanded)
  const [showTooltip, setShowTooltip] = useState(false)

  const handleToggleExpanded = useCallback(() => {
    if (!expanded) {
      setExpanded(true)
    } else {
      if (onClose) {
        onClose()
      }
      setExpanded(false)
    }
  }, [expanded, onClose])

  return (
    <>
      <IconButton
        aria-label='Toggle settings'
        onClick={handleToggleExpanded}
        onMouseOver={() => {
          if (!expanded) setShowTooltip(true)
        }}
        onMouseOut={() => setShowTooltip(false)}
        role='checkbox'
        sx={{
          width: 32,
          height: 32,
          display: ['none', 'none', 'inline-block', 'inline-block'],
          cursor: 'pointer',
          color: 'primary',
          position: 'absolute',
          opacity: 1,
          transition: `${side} 0.2s, transform 0.2s`,
          [side]: expanded
            ? [
                `calc(${width} * 100vw / 6 - 12px)`,
                `calc(${width} * 100vw / 8 - 18px)`,
                `calc(${width} * 100vw / 12 + 37px)`,
                `calc(${width} * 100vw / 12 + 54px)`,
              ]
            : '12px',
          bottom: '13px',
          transform:
            (expanded && side === 'left') || (!expanded && side === 'right')
              ? 'scaleX(-1)'
              : '',
          zIndex: 1001,
        }}
      >
        <ArrowThin sx={{ strokeWidth: 2, width: 24, height: 24 }} />
      </IconButton>
      <Box
        id='open-tooltip'
        sx={{
          display: ['none', 'none', 'inline-block', 'inline-block'],
          color: 'primary',
          position: 'absolute',
          opacity: showTooltip ? 1 : 0,
          transition: 'opacity 0.15s ease-out',
          pointerEvents: 'none',
          [side]: '54px',
          bottom: ['18px', '18px', '18px', '14px'],
          zIndex: 1001,
          fontSize: [3, 3, 3, 4],
        }}
      >
        {tooltip}
      </Box>
      <Row>
        <Column width={width} start={1}>
          <Box
            sx={{
              position: 'absolute',
              [side]: '0px',
              [side === 'left' ? 'right' : 'left']: [
                `calc(${6 - width} * (100vw - 7 * 24px) / 6 + ${
                  12 - width
                } * 24px)`,
                `calc(${8 - width} * (100vw - 9 * 32px) / 8 + ${
                  12 - width
                } * 32px)`,
                `calc(${12 - width} * (100vw - 13 * 32px) / 12 + ${
                  12 - width
                } * 32px)`,
                `calc(${12 - width} * (100vw - 13 * 48px) / 12 + ${
                  12 - width
                } * 48px)`,
              ],
              zIndex: 1000,
              transition: 'transform 0.2s',
              transform: expanded
                ? 'translateX(0)'
                : `translateX(${side === 'left' ? '-' : ''}100%)`,
            }}
          >
            <Box
              sx={{
                px: [4, 5, 5, 6],
                height: '56px',
                bg: 'background',
                [side === 'left' ? 'borderRight' : 'borderLeft']: ({
                  colors,
                }) => `${expanded ? 1 : 0}px solid ${colors.muted}`,
                borderBottom: ({ colors }) =>
                  `${expanded ? 1 : 0}px solid ${colors.muted}`,
                transition: 'border 0.2s',
              }}
            />
            <Box
              sx={{
                px: [4, 5, 5, 6],
                pb: [4],
                pt: [4],
                pointerEvents: 'all',
                bg: 'background',
                overflowY: 'scroll',
                overflowX: 'hidden',
                maxHeight: 'calc(100vh - 56px)',
                minHeight: 'calc(100vh - 56px)',
                transition: 'border 0.2s',
                [side === 'left' ? 'borderRight' : 'borderLeft']: ({
                  colors,
                }) => `${expanded ? 1 : 0}px solid ${colors.muted}`,
              }}
            >
              <Box
                sx={{
                  transition: 'opacity 0.2s',
                  opacity: expanded ? 1 : 0,
                }}
              >
                {expanded && children}
              </Box>
            </Box>
          </Box>
        </Column>
      </Row>
    </>
  )
}

export default ControlPanel
