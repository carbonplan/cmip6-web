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

  const colors = makeColormap(colormapName, { count: 9, mode: 'dark' })
    .slice(4)
    .map((c) => `rgb(${c.join(',')})`)

  // TODO: handle repeating colors?
  color = colors.find((c) => !existingColors.includes(c)) || colors[0]

  return { colormapName, color, clim }
}
