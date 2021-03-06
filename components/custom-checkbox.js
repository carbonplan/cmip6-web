import { useState } from 'react'
import { Box } from 'theme-ui'

const sxCheckbox = {
  stroke: 'secondary',
  strokeWidth: '1.25',
  width: '18px',
  cursor: 'pointer',
  transition: 'stroke 0.15s',
  'input:not(:checked) ~ &': {
    stroke: 'secondary',
  },
  '@media (hover: hover) and (pointer: fine)': {
    'input:hover ~ &': { stroke: 'primary' },
  },
  'input:focus ~ &': {
    bg: 'inherit',
  },
  'input:focus-visible ~ &': {
    outline: 'dashed 1px rgb(110, 110, 110, 0.625)',
    background: 'rgb(110, 110, 110, 0.625)',
  },
}

const CheckboxIcon = ({
  sx,
  checkedIcon: CheckedIcon,
  uncheckedIcon: UncheckedIcon,
}) => {
  return (
    <>
      <CheckedIcon
        sx={{
          ...sxCheckbox,
          ...sx,
          opacity: 0,
          'input:checked ~ &': {
            opacity: 1,
            stroke: 'primary',
          },
        }}
      />
      <UncheckedIcon
        sx={{
          ...sxCheckbox,
          ...sx,
          position: 'absolute',
          left: 0,
          opacity: 1,
          'input:checked ~ &': {
            opacity: 0,
            stroke: 'primary',
          },
        }}
      />
    </>
  )
}

const CheckboxIconWithHover = ({
  sx,
  checkedIcon: CheckedIcon,
  uncheckedIcon: UncheckedIcon,
  checkedHoverIcon: CheckedIconHover,
  uncheckedHoverIcon: UncheckedIconHover,
}) => {
  return (
    <>
      <CheckedIconHover
        sx={{
          ...sxCheckbox,
          ...sx,
          opacity: 0,
          transition: 'stroke 0s',
          'input:checked:hover ~ &': {
            opacity: 1,
            stroke: 'primary',
          },
        }}
      />
      <CheckedIcon
        sx={{
          ...sxCheckbox,
          ...sx,
          position: 'absolute',
          left: 0,
          opacity: 0,
          'input:checked ~ &': {
            opacity: 1,
            stroke: 'primary',
          },
          'input:hover ~ &': {
            opacity: 0,
          },
        }}
      />
      <UncheckedIcon
        sx={{
          ...sxCheckbox,
          ...sx,
          position: 'absolute',
          left: 0,
          opacity: 1,
          'input:checked ~ &': {
            opacity: 0,
            stroke: 'primary',
          },
        }}
      />
    </>
  )
}

const CustomCheckbox = ({
  sx,
  checkedIcon,
  uncheckedIcon,
  checkedHoverIcon,
  uncheckedHoverIcon,
  ...props
}) => {
  return (
    <Box sx={{ minWidth: 'min-content' }}>
      <Box
        as='input'
        type='checkbox'
        {...props}
        sx={{
          position: 'absolute',
          opacity: 0,
          zIndex: -1,
          width: 1,
          height: 1,
          overflow: 'hidden',
        }}
      />
      {(checkedHoverIcon || uncheckedHoverIcon) && (
        <CheckboxIconWithHover
          {...props}
          sx={sx}
          checkedHoverIcon={checkedHoverIcon}
          uncheckedHoverIcon={uncheckedHoverIcon}
          checkedIcon={checkedIcon}
          uncheckedIcon={uncheckedIcon}
          aria-hidden='true'
        />
      )}
      {!checkedHoverIcon && !uncheckedHoverIcon && (
        <CheckboxIcon
          {...props}
          sx={sx}
          checkedIcon={checkedIcon}
          uncheckedIcon={uncheckedIcon}
          aria-hidden='true'
        />
      )}
    </Box>
  )
}

export default CustomCheckbox
