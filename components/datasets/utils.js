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
  tasmax: { day: [200, 320], month: [200, 320], year: [200, 320] },
  tasmin: { day: [200, 300], month: [200, 300], year: [200, 300] },
  pr: { day: [0, 5], month: [0, 300], year: [0, 2000] },
}

export const getDatasetDisplay = (dataset, filters, forceUpdate = false) => {
  let { colormapName, clim } = dataset

  if (!colormapName || forceUpdate) {
    colormapName = DEFAULT_COLORMAPS[filters.variable]
  }

  if (!clim || forceUpdate) {
    clim = DEFAULT_CLIMS[filters.variable][filters.timescale]
  }

  return { colormapName, clim }
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
