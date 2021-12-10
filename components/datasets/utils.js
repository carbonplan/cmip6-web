export const getFiltersCallback = (filters) => {
  return (d) => d.variables.some((v) => v === filters.variable)
}

const DEFAULT_COLORMAPS = {
  tasmax: 'warm',
  tasmin: 'cool',
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
  tasmax: [0, 300],
  tasmin: [0, 300],
}
export const getDatasetDisplay = (
  dataset,
  existingColors,
  filters,
  forceUpdate = false
) => {
  let { colormapName, color, clim } = dataset

  if (!colormapName || forceUpdate) {
    colormapName = DEFAULT_COLORMAPS[filters.variable]
  }

  if (!clim || forceUpdate) {
    clim = DEFAULT_CLIMS[filters.variable]
  }

  const colors = DEFAULT_COLORS[colormapName]
  // TODO: handle repeating colors?
  color = colors.find((c) => !existingColors.includes(c)) || colors[0]

  return { colormapName, color, clim }
}
