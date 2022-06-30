import DataTable from './datasets/table'

This is an interactive tool for exploring a collection of climate projections and downscaled datasets of daily temperature and precipitation derived from the Coupled Model Intercomparison Project Phase 6 (CMIP6). Read our [explainer article](https://carbonplan.org/research/cmip6-downscaling-explainer) for more about this work.

You can use the panel on the left to filter the dataset collection based on your criteria of interest, and then select datasets for viewing in the map, as well as accessing links to the underlying data. All datasets are publicly available in `zarr` format on Microsoft Azure.

Below we describe how to interact with the map, the methods we used to produce the datasets, and the complete list of datasets and how to access them. All the code used to create these datasets can be found on [GitHub](https://github.com/carbonplan/cmip6-downscaling). We are excited about community involvement in this effort and encourage users to reach out to us at hello@carbonplan.org or through GitHub.

# Interaction

## Filtering

For any given setting of the filters in the `Datasets` section at top left, the available matching datasets will populate in the section below. Clicking on the eye icon will display that dataset in the map. The info icon will expand the entry to reveal additional metadata, including the institution that ran the original GCM, the ensemble member, the temporal aggregation scheme, the license, and a link to the data stored on Microsoft Azure.

Note that not all combinations of options are always available: for example, for a given model, scenario, and method, only certain variables may be available; and different models may have different sets of scenarios. Some of these cases are due to gaps in the underlying source data, whereas others are due to runs we have not yet completed.

## Variables

We use the same variable definitions used commonly in CMIP6: `tasmax` and `tasmin` denote, respectively, maximum and minimum near-surface temperature (at 2 m) and `pr` denotes precipitation (at-surface daily flux).

## Timescale

We aggregated daily climate data at monthly and annual timesteps for viewing in the map. Temperature is aggregated by averaging and precipitation is aggregated by summing. The underlying daily data is accessible via cloud storage.

## Scenarios

Data are available for historical and future scenarios as delineated within CMIP6. Downscaled data is available for three shared socioeconomic pathways (SSPs) corresponding to different levels of warming.

## Downscaling

This work includes the implementation of four downscaling methods, described in more detail below. Selecting any datasets labeled `Raw` will display the GCM projections at the original, coarse resolution prior to downscaling. Otherwise, datasets are labeled by their downscaling algorithm.

## Timeseries

Clicking the magnifying glass on a dataset will expand a timeseries plot at lower left showing the average of the circular region shown on the map. You can view and compare several timeseries by clicking the magnifying glass on additional datasets.

# Methods

## CMIP6 raw datasets

The downscaled datasets shown here are derived from results from the [Coupled Model Intercomparison Project Phase 6](https://doi.org/10.5194/gmd-9-1937-2016). Raw datasets are also available in the web catalog (labeled “Raw”). GCMs are run at different spatial resolutions, and the data presented here are displayed in their original spatial resolution. The raw CMIP6 datasets were accessed via the Pangeo data catalog.

## Reference dataset

All downscaled datasets here were trained on the [ERA5](https://doi.org/10.1002/qj.3803) global reanalysis product at the 0.25 degree (~25 km) spatial resolution. All downscaling methods used daily temperature maxima and minima and precipitation for the period 1981-2010. One algorithm (GARD-MV) also used wind.

## Downscaling methods

We implemented four downscaling methods globally. Descriptions of these implementations are below, along with references to further information. Our [explainer article](https://carbonplan.org/research/cmip6-downscaling-explainer) discusses the importance of downscaling, and describes some of the key methodological differences, in more detail.

### MACA

The Multivariate Adaptive Constructed Analogs method [(Abatzoglou and Brown, 2012)](https://rmets.onlinelibrary.wiley.com/doi/abs/10.1002/joc.2312) finds common spatial patterns among GCM and reference datasets to construct downscaled future projections from actual weather patterns from the past. The method involves a combination of coarse and fine-scale bias-correction, detrending of GCM data, and analog selection, steps which are detailed thoroughly in the [MACA Datasets documentation](https://climate.northwestknowledge.net/MACA/MACAmethod.php). MACA is designed to operate at the regional scale. As a result, we split the global domain into smaller regions using the AR6 delineations from the `regionmask` [package](https://regionmask.readthedocs.io/en/stable/) and downscaled each region independently. We then stitched the regions back together to create a seamless global product. Of the methods we have implemented, MACA is the most established.

### GARD-SV

The Generalized Analog Regression Downscaling (GARD) (Guttmann et al., in review) approach is a downscaling sandbox that allows scientists to create custom downscaling implementations, supporting single or multiple predictor variables, pure regression and pure analog approaches, and different bias-correction routines. At its core, GARD builds a linear model for every pixel relating the reference dataset at the fine-scale to the same data coarsened to the scale of the GCM. The downscaled projections are then further perturbed by spatially-correlated random fields to reflect the error in the regression models. Our GARD-SV (single-variate) implementation uses the same variable for training and prediction (e.g. precipitation is the only predictor for downscaling precipitation). For regression, we used the PureRegression method, building a single model for each pixel from the entire timeseries of training data. The precipitation model included a logistic regression component, with a threshold of 0 mm/day for constituting a precipitation event.

### GARD-MV

The GARD-MV (multi-variate) implementation follows the same process as the GARD-SV method but uses multiple predictor variables for model training and inference. Specifically, we used three predictors for each downscaling model, adding the two directions of 500mb winds to each model. Thus, the predictors for precipitation in this model are precipitation, longitudinal wind, and latitudinal wind.

### DeepSD

DeepSD uses a computer vision approach to learn spatial patterns at multiple resolutions [Vandal et al., 2017](https://dl.acm.org/doi/10.1145/3097983.3098004). Specifically, DeepSD is a stacked super-resolution convolutional neural network. We adapted the [open-source DeepSD implementation](https://github.com/tjvandal/deepsd) for downscaling global ensembles by updating the source code for Python 3 and TensorFlow2, removing the batch normalization layer, normalizing based on historical observations, training models for temperature and precipitation, and training on a global reanalysis product (ERA5). In addition, we trained the model for fewer iterations than in Vandal et al., 2017 and clipped aphysical precipitation values at 0. Our dataset includes an additional bias-corrected product (DeepSD-BC). Given its origin in deep learning, this method is the most different from those included here, and is an experimental contribution to our dataset.

# Access

There are two ways to access the data using Python.

First, the entire collection of datasets at daily timescales is available through an `intake` catalog using the following code snippet.

```
import intake
cat = intake.open_esm_datastore('https://cmip6downscaling.blob.core.windows.net/version1/catalogs/global-downscaled-cmip6.json'
)
```

You can check out this example [Jupyter notebook](https://github.com/carbonplan/cmip6-downscaling/blob/main/notebooks/accessing_data_example.ipynb) to see how to access the data, perform some simple analysis, and download subsets.

You can also access the data by using the URL of an individual dataset. See below for a table of all available datasets in this collection with storage locations and other metadata. A code snippet showing how to use the URL is shown below:

```
import xarray as xr
xr.open_zarr(‘https://cmip6downscaling.blob.core.windows.net/version1/data/DeepSD/ScenarioMIP.CCCma.CanESM5.ssp245.r1i1p1f1.day.DeepSD.pr.zarr’)
```

These are all daily datasets. For any given dataset, you can access the monthly or yearly aggregation by changing the `day` in the URL to either `month` or `year`. These monthly and yearly aggregated versions are the one we show in the map tool.

<DataTable />
