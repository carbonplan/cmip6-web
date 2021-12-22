import { makeColormap } from '@carbonplan/colormaps'

export const getFiltersCallback = (filters) => {
  return (d) =>
    d.variables.some((v) => v === filters.variable) &&
    d.timescale === filters.timescale &&
    d.experiment === filters.experiment &&
    filters.gcm[d.gcm] &&
    filters.method[d.method]
}

const DEFAULT_COLORMAPS = {
  tasmax: 'warm',
  tasmin: 'warm',
  pr: 'cool',
}

const DEFAULT_CLIMS = {
  tasmax: [200, 320],
  tasmin: [200, 300],
  pr: [0, 0.0004],
}

const DIVERGING = ['pinkgreen', 'redteal', 'orangeblue', 'yellowpurple']

const getColors = (colormapName) => {
  let rawColors
  if (colormapName.endsWith('grey')) {
    rawColors = makeColormap(colormapName, { count: 9, mode: 'dark' }).slice(
      0,
      4
    )
  } else if (DIVERGING.includes(colormapName)) {
    rawColors = makeColormap(colormapName, { count: 9, mode: 'dark' })
    rawColors = rawColors.slice(0, 3).concat(rawColors.slice(5))
  } else {
    rawColors = makeColormap(colormapName, { count: 9, mode: 'dark' }).slice(4)
  }

  return rawColors.map((c) => `rgb(${c.join(',')})`)
}

const getLeastUsedColor = (colors, existingColors) => {
  const counts = colors.reduce((accum, color) => ({ ...accum, [color]: 0 }), {})

  existingColors.forEach((color) => {
    if (typeof counts[color] === 'number') {
      counts[color] += 1
    }
  })

  let leastUsed
  colors.forEach((color) => {
    if (!leastUsed || counts[color] < counts[leastUsed]) {
      leastUsed = color
    }
  })

  return leastUsed
}

export const getDatasetDisplay = (
  dataset,
  existingColors,
  filters,
  forceUpdate = false
) => {
  let { colormapName, clim } = dataset

  if (!colormapName || forceUpdate) {
    colormapName = DEFAULT_COLORMAPS[filters.variable]
  }

  if (!clim || forceUpdate) {
    clim = DEFAULT_CLIMS[filters.variable]
  }

  const color = getLeastUsedColor(getColors(colormapName), existingColors)

  return { colormapName, color, clim }
}

const countUniqueValues = (datasets, attribute) => {
  const counts = {}
  for (const name in datasets) {
    if (datasets[name].selected) {
      const value = datasets[name][attribute]
      counts[value] ||= 0
      counts[value] += 1
    }
  }

  return Object.keys(counts).length
}

export const getSelectedShortNames = (datasets) => {
  let uniqueIdentifiers
  if (
    Object.keys(datasets || {}).filter((key) => datasets[key].selected)
      .length === 1
  ) {
    uniqueIdentifiers = ['gcm']
  } else {
    uniqueIdentifiers = ['gcm', 'method', 'experiment'].filter(
      (identifier) => countUniqueValues(datasets, identifier) > 1
    )
  }

  const result = {}
  for (const name in datasets) {
    result[name] = uniqueIdentifiers
      .map((identifier) => datasets[name][identifier])
      .join('.')
  }

  return result
}
