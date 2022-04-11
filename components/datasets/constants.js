export const COLORMAP_COLORS = {
  reds: 'red',
  oranges: 'orange',
  yellows: 'yellow',
  greens: 'green',
  teals: 'teal',
  blues: 'blue',
  purples: 'purple',
  pinks: 'pink',
  greys: 'grey',
  fire: 'red',
  earth: 'green',
  water: 'blue',
  heart: 'purple',
  wind: 'grey',
  warm: 'pink',
  cool: 'blue',
  pinkgreen: 'pink',
  redteal: 'red',
  orangeblue: 'orange',
  yellowpurple: 'yellow',
  redgrey: 'red',
  orangegrey: 'orange',
  yellowgrey: 'yellow',
  greengrey: 'green',
  tealgrey: 'teal',
  bluegrey: 'blue',
  purplegrey: 'purple',
  pinkgrey: 'pink',
  rainbow: 'teal',
  sinebow: 'yellow',
}

export const DEFAULT_DISPLAY_TIMES = {
  HISTORICAL: { year: 1950, month: 1, day: 1 },
  PROJECTED: { year: 2015, month: 1, day: 1 },
}

export const DEFAULT_DISPLAY_UNITS = {
  tasmax: 'K',
  tasmin: 'K',
  pr: 'mm',
}

export const DEFAULT_CLIMS = {
  tasmax: { day: [200, 320], month: [200, 320], year: [200, 320] },
  tasmin: { day: [200, 300], month: [200, 300], year: [200, 300] },
  pr: { day: [0, 1], month: [0, 300], year: [0, 2000] },
}

export const DEFAULT_COLORMAPS = {
  tasmax: 'warm',
  tasmin: 'warm',
  pr: 'cool',
}
