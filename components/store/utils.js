export const getFiltersCallback = (filters) => {
  return (d) => d.variables.some((v) => v === filters.variable)
}

const DEFAULT_COLORMAPS = {
  tavg: 'warm',
  prec: 'cool',
}

// TODO: use real colormap values
const DEFAULT_COLORS = {
  warm: ['purple', 'pink', 'red', 'orange', 'yellow'],
  cool: ['purple', 'blue', 'teal', 'green', 'yellow'],
  reds: ['red'],
  oranges: ['orange'],
  yellows: ['yellow'],
  greens: ['green'],
  teals: ['teal'],
  blues: ['blue'],
  purples: ['purple'],
  pinks: ['pink'],
  greys: ['grey'],
  fire: ['fir'],
  earth: ['eart'],
  water: ['wate'],
  heart: ['hear'],
  wind: ['win'],
  pinkgreen: ['pink', 'green'],
  redteal: ['red', 'teal'],
  orangeblue: ['orange', 'blue'],
  yellowpurple: ['yellow', 'purple'],
  redgrey: ['red'],
  orangegrey: ['orange'],
  yellowgrey: ['yellow'],
  greengrey: ['green'],
  tealgrey: ['teal'],
  bluegrey: ['blue'],
  purplegrey: ['purple'],
  pinkgrey: ['pink'],
  rainbow: [
    'purple',
    'blue',
    'teal',
    'green',
    'yellow',
    'orange',
    'red',
    'pink',
  ],
  sinebow: [
    'red',
    'orange',
    'yellow',
    'green',
    'teal',
    'blue',
    'purple',
    'pink',
  ],
}

const DEFAULT_CLIMS = {
  tavg: [-20, 30],
  prec: [0, 300],
}
export const getDatasetDisplay = (
  dataset,
  existingColors,
  filters,
  oldFilters = {}
) => {
  let { colormapName, color, clim } = dataset

  if (
    !colormapName ||
    colormapName === DEFAULT_COLORMAPS[oldFilters.variable]
  ) {
    colormapName = DEFAULT_COLORMAPS[filters.variable]
  }

  if (!clim || clim === DEFAULT_CLIMS[oldFilters.variable]) {
    clim = DEFAULT_CLIMS[filters.variable]
  }

  const colors = DEFAULT_COLORS[colormapName]
  // TODO: handle repeating colors?
  color = colors.find((c) => !existingColors.includes(c)) || colors[0]

  return { colormapName, color, clim }
}
