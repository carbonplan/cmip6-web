export const getFiltersCallback = (filters) => {
  return (d) => {
    if (d.variable !== filters.variable || d.timescale !== filters.timescale) {
      return false
    }

    if (d.era5) {
      return filters.experiment.historical
    } else {
      return (
        filters.experiment[d.experiment] &&
        filters.gcm[d.gcm] &&
        filters.method[d.method]
      )
    }
  }
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
  pr: { day: [0, 1], month: [0, 300], year: [0, 2000] },
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

export const convertUnits = (value, from, to) => {
  if (from === to) {
    return value
  }
  // temperature units
  if (from === 'K' && to === '°C') {
    return value - 273.15
  } else if (from === '°C' && to === 'K') {
    return value + 273.15
  } else if (from === 'K' && to === '°F') {
    return convertUnits(value, from, '°C') * (9 / 5) + 32
  } else if (from === '°F' && to === 'K') {
    return convertUnits((value - 32) * (5 / 9), '°C', to)
  }

  // precipitation units
  if (from === 'mm' && to === 'in') {
    return value / 25.4
  } else if (from === 'in' && to === 'mm') {
    return value * 25.4
  }

  throw new Error(`Unable to convert units from ${from} to ${to}`)
}

// export const getUnitsConverter = (units, displayUnits) => {
//   return {
//     display: (value) => convertUnits(value, units, displayUnits),
//     raw: (displayValue) => convertUnits(displayValue, displayUnits, units),
//   }
// }

const EXPERIMENTS = {
  ssp245: 'SSP2-4.5',
  ssp370: 'SSP3-7.0',
  ssp585: 'SSP5-8.5',
}
export const getShortName = (dataset, filters) => {
  const { experiment, gcm, method, era5 } = dataset

  if (era5) {
    return 'Observational*'
  }

  const attributes = [gcm, method]
  if (!filters.experiment.historical) {
    attributes.push(EXPERIMENTS[experiment])
  }

  return attributes.join(' ')
}
