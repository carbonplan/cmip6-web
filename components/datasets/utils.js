export const getFiltersCallback = (filters) => {
  return (d) =>
    d.variable === filters.variable &&
    d.timescale === filters.timescale &&
    filters.experiment[d.experiment] &&
    filters.gcm[d.gcm] &&
    filters.method[d.method]
}

export const areSiblings = (d1, d2) => {
  return (
    d1.experiment === d2.experiment &&
    d1.gcm === d2.gcm &&
    d1.method === d2.method
  )
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

const EXPERIMENTS = {
  ssp245: 'SSP2-4.5',
  ssp370: 'SSP3-7.0',
  ssp585: 'SSP5-8.5',
}
export const getShortName = (dataset, filters) => {
  const { experiment, gcm, method } = dataset

  const attributes = [gcm, method]
  if (!filters.experiment.historical) {
    attributes.push(EXPERIMENTS[experiment])
  }

  return attributes.join(' ')
}
