import create from 'zustand'
import zarr from 'zarr-js'

import DateStrings from './date-strings'
import {
  areSiblings,
  getDatasetDisplay,
  getFiltersCallback,
  getUnitsConverter,
} from './utils'

const DEFAULT_DISPLAY_TIMES = {
  HISTORICAL: { year: 1950, month: 1, day: 1 },
  PROJECTED: { year: 2015, month: 1, day: 1 },
}

const getInitialDatasets = (data, attrs) => {
  return data.datasets
    .sort((a, b) => (a.experiment_id === 'reanalysis' ? -1 : 1))
    .reduce((accum, dataset) => {
      accum[dataset.name] = {
        name: dataset.name,
        source: dataset.uri,
        variable: dataset.variable_id,
        gcm: dataset.source_id,
        method: dataset.method,
        experiment: dataset.experiment_id,
        timescale: dataset.timescale,
        original_dataset_uris: dataset.original_dataset_uris,
        institution: dataset.institution_id,
        aggregation: dataset.aggregation,
        member: dataset.member_id,

        dateStrings: null,
        selected: false,
        loaded: false,
        colormapName: null,
        clim: null,

        units: null,
        displayUnits: null,
        unitsConverter: null,

        era5: dataset.experiment_id === 'reanalysis',
      }
      return accum
    }, {})
}

const getInitialFilters = (datasets) => {
  return Object.keys(datasets).reduce(
    (accum, name) => {
      const ds = datasets[name]
      accum.experiment[ds.experiment] = accum.experiment[ds.experiment] ?? true
      accum.gcm[ds.gcm] = true
      accum.method[ds.method] = true
      return accum
    },
    {
      variable: 'tasmax',
      timescale: 'year',
      experiment: { historical: false },
      gcm: {},
      method: {},
    }
  )
}

export const useDatasetsStore = create((set, get) => ({
  datasets: null,
  active: null,
  hovered: null,
  filters: null,
  displayTime: DEFAULT_DISPLAY_TIMES.HISTORICAL,
  updatingTime: false,
  fetchDatasets: async () => {
    const result = await fetch(
      'https://cmip6downscaling.blob.core.windows.net/flow-outputs/results/pyramids/combined-cmip6-era5-pyramids-catalog-web.json'
    )

    const data = await result.json()

    const datasets = getInitialDatasets(data)
    const filters = getInitialFilters(datasets)

    set({ datasets, filters })
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
  setHovered: (name) => set({ hovered: name }),
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
  setDatasetUnits: (name, units) =>
    set(({ datasets, filters }) => {
      const dataset = datasets[name]

      if (dataset.units) {
        return {}
      } else {
        let updatedDataset = {
          ...dataset,
          units,
          displayUnits: units,
          unitsConverter: getUnitsConverter(units, units),
        }
        updatedDataset = {
          ...updatedDataset,
          ...getDatasetDisplay(updatedDataset, filters, true),
        }

        return {
          datasets: { ...datasets, [name]: updatedDataset },
        }
      }
    }),
  setFilters: (value) =>
    set(({ active, displayTime, filters, datasets, selectDataset }) => {
      const updatedFilters = { ...filters, ...value }
      const cb = getFiltersCallback(updatedFilters)
      let updatedActive = active
      const updatedDatasets = Object.keys(datasets).reduce((accum, k) => {
        const dataset = datasets[k]
        const visible = cb(dataset)
        let selected = false
        let displayUpdates = {}

        if (visible) {
          selected = dataset.selected
          displayUpdates = getDatasetDisplay(dataset, updatedFilters, true)
          if (active && areSiblings(dataset, datasets[active])) {
            updatedActive = k
          }

          if (
            !dataset.selected &&
            Object.values(datasets).find(
              (s) => s.selected && areSiblings(dataset, s)
            )
          ) {
            selectDataset(k)
            selected = true
          }
        } else if (updatedActive === k) {
          updatedActive = null
        }
        accum[k] = {
          ...dataset,
          ...displayUpdates,
          selected,
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
        (k) => !['colormapName', 'clim', 'displayUnits'].includes(k)
      )
      if (invalidKey) {
        throw new Error(
          `Unexpected display update. Invalid key: ${invalidKey}, must be one of 'colormapName', 'clim', 'displayUnits'`
        )
      }

      const updatedDataset = { ...datasets[name], ...values }

      return {
        datasets: {
          ...datasets,
          [name]: {
            ...updatedDataset,
            ...getDatasetDisplay(updatedDataset, filters),
            unitsConverter: getUnitsConverter(
              updatedDataset.units,
              updatedDataset.displayUnits
            ),
          },
        },
      }
    }),
}))
