export const getFiltersCallback = (filters) => {
  return (d) =>
    d.variables.some((v) => v === filters.variable) &&
    d.timescale === filters.timescale &&
    d.experiment === filters.experiment &&
    filters.gcm[d.gcm] &&
    filters.method[d.method]
}

export const DEFAULT_COLORMAPS = {
  tasmax: 'warm',
  tasmin: 'warm',
  pr: 'cool',
}

const DEFAULT_CLIMS = {
  tasmax: [200, 320],
  tasmin: [200, 300],
  pr: [0, 0.0004],
}

export const getDatasetDisplay = (dataset, filters, forceUpdate = false) => {
  let { colormapName, clim } = dataset

  if (!colormapName || forceUpdate) {
    colormapName = DEFAULT_COLORMAPS[filters.variable]
  }

  if (!clim || forceUpdate) {
    clim = DEFAULT_CLIMS[filters.variable]
  }

  return { colormapName, clim }
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
