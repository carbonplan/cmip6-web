import { DEFAULT_CLIMS, DEFAULT_COLORMAPS } from './constants'

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
  } else if (from === '°C' && to === '°F') {
    return value * (9 / 5) + 32
  } else if (from === '°F' && to === '°C') {
    return (value - 32) * (5 / 9)
  }

  // precipitation units
  if (from === 'mm' && to === 'in') {
    return value / 25.4
  } else if (from === 'in' && to === 'mm') {
    return value * 25.4
  } else if (from === 'mm' && to === 'kg m-2 s-1') {
    return value / 86400
  } else if (from === 'kg m-2 s-1' && to === 'mm') {
    return value * 86400
  } else if (from === 'in' && to === 'kg m-2 s-1') {
    return convertUnits(value, from, 'mm') / 86400
  } else if (from === 'kg m-2 s-1' && to === 'in') {
    return convertUnits(value * 86400, 'mm', to)
  }

  throw new Error(`Unable to convert units from ${from} to ${to}`)
}

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

  const attributes = [gcm]
  if (!filters.experiment.historical) {
    attributes.push(EXPERIMENTS[experiment])
  }
  attributes.push(method)

  return attributes.join(' ')
}
