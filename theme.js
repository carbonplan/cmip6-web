import base from '@carbonplan/theme'

export default {
  ...base,
  styles: {
    ...base.styles,
    p: {
      ...base.styles.p,
      fontSize: [2, 2, 2, 3],
    },
    h1: {
      ...base.styles.h2,
    },
    h2: {
      ...base.styles.h3,
    },
    h3: {
      fontSize: [3, 3, 3, 4],
      fontFamily: 'heading',
      fontWeight: 'heading',
      lineHeight: 'h3',
      mt: [3, 4, 4],
      mb: [2, 3, 3],
    },
  },
}
