export const getFiltersCallback = (filters) => {
  return (d) => d.variables.some((v) => v === filters.variable)
}

const DEFAULT_COLORMAPS = {
  tavg: 'warm',
  prec: 'cool',
}

const DEFAULT_COLORS = {
  warm: ['purple', 'pink', 'red', 'orange', 'yellow'],
  cool: ['purple', 'blue', 'teal', 'green', 'yellow'],
}

const DEFAULT_CLIMS = {
  tavg: [-20, 30],
  prec: [0, 300],
}
export const getDatasetDisplay = (dataset, filters, oldFilters = {}) => {
  let { colormapName, color, clim, ...rest } = dataset.display

  if (
    !colormapName ||
    colormapName === DEFAULT_COLORMAPS[oldFilters.variable]
  ) {
    colormapName = DEFAULT_COLORMAPS[filters.variable]

    const colors = DEFAULT_COLORS[colormapName]
    // TODO: do this deterministically based on actual colormap values
    color = colors[Math.floor(Math.random() * colors.length)]
  }

  if (!clim || clim === DEFAULT_CLIMS[oldFilters.variable]) {
    clim = DEFAULT_CLIMS[filters.variable]
  }

  return { ...rest, colormapName, color, clim }
}
