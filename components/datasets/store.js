import create from 'zustand'
import zarr from 'zarr-js'

import DateStrings from './date-strings'
import { getDatasetDisplay, getFiltersCallback } from './utils'

const DEFAULT_DISPLAY_TIMES = {
  HISTORICAL: { year: 1981, month: 1, day: 1 },
  PROJECTED: { year: 2020, month: 1, day: 1 },
}
const getInitialDatasets = (data) => {
  return data.datasets.reduce((accum, dataset) => {
    accum[dataset.name] = {
      name: dataset.name,
      source: dataset.uri,
      variables: dataset.variables,
      gcm: dataset.gcm,
      method: dataset.method,
      experiment: dataset.experiment,
      timescale: dataset.timescale,
      dateStrings: null,
      selected: false,
      loaded: false,
      colormapName: null,
      clim: null,
    }
    return accum
  }, {})
}

const getInitialFilters = (data) => {
  return data.datasets.reduce(
    (accum, ds) => {
      accum.experiment[ds.experiment] = accum.experiment[ds.experiment] || true
      accum.gcm[ds.gcm] = true
      accum.method[ds.method] = true
      return accum
    },
    {
      variable: 'tasmax',
      timescale: 'day',
      experiment: {},
      gcm: {},
      method: {},
    }
  )
}

export const useDatasetsStore = create((set, get) => ({
  datasets: null,
  active: null,
  filters: null,
  displayTime: DEFAULT_DISPLAY_TIMES.HISTORICAL,
  updatingTime: false,
  fetchDatasets: () => {
    const data = {
      version: '1.0.0',
      history: 'Updated by jhamman on 12/22/2021',
      title: "CarbonPlan's CMIP6 downscaled data archive",
      description:
        'This catalog represents the complete web-optimized archive for CarbonPlan\u2019s CMIP6 downscaled data archive. See https://github.com/carbonplan/cmip6-downscaling for more details.',
      datasets: [
        {
          name: 'full time BCSD',
          gcm: 'MIROC6',
          experiment: 'historical',
          member: 'r1i1p1f1',
          timescale: 'year',
          method: 'BCSD',
          variables: ['tasmax'],
          uri: 'https://cmip6downscaling.blob.core.windows.net/flow-outputs/prefect_results/pyramid_annual/MIROC6/ssp370/tasmax/40.0_50.0_80.0_90.0/1981_2010/1981_2099/.pyr',
        },
        {
          name: 'BCSD daily',
          gcm: 'MIROC6',
          experiment: 'ssp370',
          member: 'r1i1p1f1',
          timescale: 'day',
          method: 'BCSD',
          variables: ['tasmax'],
          uri: 'https://cmip6downscaling.blob.core.windows.net/flow-outputs/testing_results/pyramid_daily/MIROC6/ssp370/tasmax/-90.0_90.0_-180.0_180.0/1990_1990/2020_2020/.pyr',
        },
        {
          name: 'BCSD monthly',
          gcm: 'MIROC6',
          experiment: 'ssp370',
          member: 'r1i1p1f1',
          timescale: 'month',
          method: 'BCSD',
          variables: ['tasmax'],
          uri: 'https://cmip6downscaling.blob.core.windows.net/flow-outputs/testing_results/pyramid_monthly/MIROC6/ssp370/tasmax/-90.0_90.0_-180.0_180.0/1990_1990/2020_2020/.pyr',
        },
        {
          name: 'BCSD yearly',
          gcm: 'MIROC6',
          experiment: 'ssp370',
          member: 'r1i1p1f1',
          timescale: 'year',
          method: 'BCSD',
          variables: ['tasmax'],
          uri: 'https://cmip6downscaling.blob.core.windows.net/flow-outputs/testing_results/pyramid_annual/MIROC6/ssp370/tasmax/-90.0_90.0_-180.0_180.0/1990_1990/2020_2020/.pyr',
        },
        {
          name: 'GARD daily',
          gcm: 'MIROC6',
          experiment: 'ssp370',
          member: 'r1i1p1f1',
          timescale: 'day',
          method: 'GARD',
          variables: ['tasmax'],
          uri: 'https://cmip6downscaling.blob.core.windows.net/flow-outputs/results_testing/pyramid_daily/gard/MIROC6/ssp370/pr_tasmax_tasmin/-90.0_90.0_-180.0_180.0/2010_2010/2099_2099/tasmax.pyr',
        },
        {
          name: 'GARD monthly',
          gcm: 'MIROC6',
          experiment: 'ssp370',
          member: 'r1i1p1f1',
          timescale: 'month',
          method: 'GARD',
          variables: ['tasmax'],
          uri: 'https://cmip6downscaling.blob.core.windows.net/flow-outputs/results_testing/pyramid_monthly/gard/MIROC6/ssp370/pr_tasmax_tasmin/-90.0_90.0_-180.0_180.0/2010_2010/2099_2099/tasmax.pyr',
        },
        {
          name: 'GARD yearly',
          gcm: 'MIROC6',
          experiment: 'ssp370',
          member: 'r1i1p1f1',
          timescale: 'year',
          method: 'GARD',
          variables: ['tasmax'],
          uri: 'https://cmip6downscaling.blob.core.windows.net/flow-outputs/results_testing/pyramid_annual/gard/MIROC6/ssp370/pr_tasmax_tasmin/-90.0_90.0_-180.0_180.0/2010_2010/2099_2099/tasmax.pyr',
        },
      ],
    }
    set({
      datasets: getInitialDatasets(data),
      filters: getInitialFilters(data),
    })
  },
  setDisplayTime: (value) => set({ displayTime: value }),
  setUpdatingTime: (value) => set({ updatingTime: value }),
  loadDateStrings: async (name) => {
    const [date_str, time] = await Promise.all([
      new Promise((resolve) =>
        zarr().load(
          `${get().datasets[name].source}/0/date_str`,
          (err, array) => {
            resolve(Array.from(array.data))
          }
        )
      ),
      new Promise((resolve) =>
        zarr().load(`${get().datasets[name].source}/0/time`, (err, array) => {
          resolve(Array.from(array.data))
        })
      ),
    ])

    const dateStrings = new DateStrings(
      date_str,
      time,
      get().datasets[name].timescale
    )
    const { datasets } = get()
    const dataset = datasets[name]
    set({
      datasets: { ...datasets, [name]: { ...dataset, dateStrings } },
    })
  },
  setActive: (name) =>
    set(({ datasets, selectDataset }) => {
      // ensure that `active` dataset is also `selected`
      if (name && !datasets[name].selected) {
        selectDataset(name)
      }

      return {
        active: name,
      }
    }),
  setLoaded: (name) =>
    set(({ datasets }) => {
      const updatedDataset = {
        ...datasets[name],
        loaded: true,
      }

      return {
        datasets: { ...datasets, [name]: updatedDataset },
      }
    }),
  selectDataset: (name) =>
    set(({ datasets, filters, loadDateStrings }) => {
      const dataset = datasets[name]

      const updatedDataset = {
        ...dataset,
        ...getDatasetDisplay(dataset, filters, true),
        selected: true,
      }

      if (!dataset.dateStrings) {
        loadDateStrings(name)
      }

      return {
        datasets: { ...datasets, [name]: updatedDataset },
      }
    }),
  setFilters: (value) =>
    set(({ active, displayTime, filters, datasets }) => {
      const updatedFilters = { ...filters, ...value }
      const cb = getFiltersCallback(updatedFilters)
      let updatedActive = active
      const updatedDatasets = Object.keys(datasets).reduce((accum, k) => {
        const dataset = datasets[k]
        const visible = cb(dataset)
        let displayUpdates = {}
        if (visible) {
          displayUpdates = getDatasetDisplay(dataset, updatedFilters, true)
        } else if (active === k) {
          updatedActive = null
        }
        accum[k] = {
          ...dataset,
          ...displayUpdates,
          selected: visible && dataset.selected,
        }
        return accum
      }, {})

      let updatedDisplayTime = displayTime
      if (
        filters.experiment.historical !== updatedFilters.experiment.historical
      ) {
        updatedDisplayTime = updatedFilters.experiment.historical
          ? DEFAULT_DISPLAY_TIMES.HISTORICAL
          : DEFAULT_DISPLAY_TIMES.PROJECTED
      }

      return {
        active: updatedActive,
        datasets: updatedDatasets,
        filters: updatedFilters,
        displayTime: updatedDisplayTime,
      }
    }),

  deselectDataset: (name) =>
    set(({ active, datasets }) => {
      const dataset = datasets[name]
      const updatedDataset = {
        ...dataset,
        selected: false,
        loaded: false,
      }

      return {
        active: active === name ? null : active,
        datasets: { ...datasets, [name]: updatedDataset },
      }
    }),
  updateDatasetDisplay: (name, values) =>
    set(({ datasets, filters }) => {
      const invalidKey = Object.keys(values).find(
        (k) => !['colormapName', 'clim'].includes(k)
      )
      if (invalidKey) {
        throw new Error(
          `Unexpected display update. Invalid key: ${invalidKey}, must be one of 'colormapName', 'clim'`
        )
      }

      const updatedDataset = { ...datasets[name], ...values }

      return {
        datasets: {
          ...datasets,
          [name]: {
            ...updatedDataset,
            ...getDatasetDisplay(updatedDataset, filters),
          },
        },
      }
    }),
}))
