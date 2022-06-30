import { Box } from 'theme-ui'
import { Row, Column } from '@carbonplan/components'

const data = [
  [
    'CanESM5',
    'SSP2-4.5',
    'DeepSD',
    'pr',
    'CC-BY-SA-4.0',
    'https://cmip6downscaling.blob.core.windows.net/version1/data/DeepSD/ScenarioMIP.CCCma.CanESM5.ssp245.r1i1p1f1.day.DeepSD.pr.zarr',
  ],
  [
    'CanESM5',
    'SSP2-4.5',
    'DeepSD-BC',
    'pr',
    'CC-BY-SA-4.0',
    'https://cmip6downscaling.blob.core.windows.net/version1/data/DeepSD-BC/ScenarioMIP.CCCma.CanESM5.ssp245.r1i1p1f1.day.DeepSD-BC.pr.zarr',
  ],
  [
    'CanESM5',
    'SSP2-4.5',
    'DeepSD',
    'tasmin',
    'CC-BY-SA-4.0',
    'https://cmip6downscaling.blob.core.windows.net/version1/data/DeepSD/ScenarioMIP.CCCma.CanESM5.ssp245.r1i1p1f1.day.DeepSD.tasmin.zarr',
  ],
  [
    'CanESM5',
    'SSP2-4.5',
    'DeepSD-BC',
    'tasmin',
    'CC-BY-SA-4.0',
    'https://cmip6downscaling.blob.core.windows.net/version1/data/DeepSD-BC/ScenarioMIP.CCCma.CanESM5.ssp245.r1i1p1f1.day.DeepSD-BC.tasmin.zarr',
  ],
  [
    'CanESM5',
    'historical',
    'DeepSD',
    'pr',
    'CC-BY-SA-4.0',
    'https://cmip6downscaling.blob.core.windows.net/version1/data/DeepSD/CMIP.CCCma.CanESM5.historical.r1i1p1f1.day.DeepSD.pr.zarr',
  ],
  [
    'CanESM5',
    'historical',
    'DeepSD-BC',
    'pr',
    'CC-BY-SA-4.0',
    'https://cmip6downscaling.blob.core.windows.net/version1/data/DeepSD-BC/CMIP.CCCma.CanESM5.historical.r1i1p1f1.day.DeepSD-BC.pr.zarr',
  ],
  [
    'CanESM5',
    'historical',
    'DeepSD',
    'tasmax',
    'CC-BY-SA-4.0',
    'https://cmip6downscaling.blob.core.windows.net/version1/data/DeepSD/CMIP.CCCma.CanESM5.historical.r1i1p1f1.day.DeepSD.tasmax.zarr',
  ],
  [
    'CanESM5',
    'historical',
    'DeepSD-BC',
    'tasmax',
    'CC-BY-SA-4.0',
    'https://cmip6downscaling.blob.core.windows.net/version1/data/DeepSD-BC/CMIP.CCCma.CanESM5.historical.r1i1p1f1.day.DeepSD-BC.tasmax.zarr',
  ],
  [
    'CanESM5',
    'historical',
    'DeepSD',
    'tasmin',
    'CC-BY-SA-4.0',
    'https://cmip6downscaling.blob.core.windows.net/version1/data/DeepSD/CMIP.CCCma.CanESM5.historical.r1i1p1f1.day.DeepSD.tasmin.zarr',
  ],
  [
    'CanESM5',
    'historical',
    'DeepSD-BC',
    'tasmin',
    'CC-BY-SA-4.0',
    'https://cmip6downscaling.blob.core.windows.net/version1/data/DeepSD-BC/CMIP.CCCma.CanESM5.historical.r1i1p1f1.day.DeepSD-BC.tasmin.zarr',
  ],
  [
    'CanESM5',
    'SSP2-4.5',
    'DeepSD',
    'tasmax',
    'CC-BY-SA-4.0',
    'https://cmip6downscaling.blob.core.windows.net/version1/data/DeepSD/ScenarioMIP.CCCma.CanESM5.ssp245.r1i1p1f1.day.DeepSD.tasmax.zarr',
  ],
  [
    'CanESM5',
    'SSP2-4.5',
    'DeepSD-BC',
    'tasmax',
    'CC-BY-SA-4.0',
    'https://cmip6downscaling.blob.core.windows.net/version1/data/DeepSD-BC/ScenarioMIP.CCCma.CanESM5.ssp245.r1i1p1f1.day.DeepSD-BC.tasmax.zarr',
  ],
  [
    'CanESM5',
    'SSP3-7.0',
    'DeepSD',
    'pr',
    'CC-BY-SA-4.0',
    'https://cmip6downscaling.blob.core.windows.net/version1/data/DeepSD/ScenarioMIP.CCCma.CanESM5.SSP3-7.0.r1i1p1f1.day.DeepSD.pr.zarr',
  ],
  [
    'CanESM5',
    'SSP3-7.0',
    'DeepSD-BC',
    'pr',
    'CC-BY-SA-4.0',
    'https://cmip6downscaling.blob.core.windows.net/version1/data/DeepSD-BC/ScenarioMIP.CCCma.CanESM5.SSP3-7.0.r1i1p1f1.day.DeepSD-BC.pr.zarr',
  ],
  [
    'CanESM5',
    'SSP3-7.0',
    'DeepSD',
    'tasmax',
    'CC-BY-SA-4.0',
    'https://cmip6downscaling.blob.core.windows.net/version1/data/DeepSD/ScenarioMIP.CCCma.CanESM5.SSP3-7.0.r1i1p1f1.day.DeepSD.tasmax.zarr',
  ],
  [
    'CanESM5',
    'SSP3-7.0',
    'DeepSD-BC',
    'tasmax',
    'CC-BY-SA-4.0',
    'https://cmip6downscaling.blob.core.windows.net/version1/data/DeepSD-BC/ScenarioMIP.CCCma.CanESM5.SSP3-7.0.r1i1p1f1.day.DeepSD-BC.tasmax.zarr',
  ],
  [
    'CanESM5',
    'SSP3-7.0',
    'DeepSD',
    'tasmin',
    'CC-BY-SA-4.0',
    'https://cmip6downscaling.blob.core.windows.net/version1/data/DeepSD/ScenarioMIP.CCCma.CanESM5.SSP3-7.0.r1i1p1f1.day.DeepSD.tasmin.zarr',
  ],
  [
    'CanESM5',
    'SSP3-7.0',
    'DeepSD-BC',
    'tasmin',
    'CC-BY-SA-4.0',
    'https://cmip6downscaling.blob.core.windows.net/version1/data/DeepSD-BC/ScenarioMIP.CCCma.CanESM5.SSP3-7.0.r1i1p1f1.day.DeepSD-BC.tasmin.zarr',
  ],
  [
    'CanESM5',
    'SSP5-8.5',
    'DeepSD',
    'pr',
    'CC-BY-SA-4.0',
    'https://cmip6downscaling.blob.core.windows.net/version1/data/DeepSD/ScenarioMIP.CCCma.CanESM5.ssp585.r1i1p1f1.day.DeepSD.pr.zarr',
  ],
  [
    'CanESM5',
    'SSP5-8.5',
    'DeepSD-BC',
    'pr',
    'CC-BY-SA-4.0',
    'https://cmip6downscaling.blob.core.windows.net/version1/data/DeepSD-BC/ScenarioMIP.CCCma.CanESM5.ssp585.r1i1p1f1.day.DeepSD-BC.pr.zarr',
  ],
  [
    'CanESM5',
    'SSP5-8.5',
    'DeepSD',
    'tasmax',
    'CC-BY-SA-4.0',
    'https://cmip6downscaling.blob.core.windows.net/version1/data/DeepSD/ScenarioMIP.CCCma.CanESM5.ssp585.r1i1p1f1.day.DeepSD.tasmax.zarr',
  ],
  [
    'CanESM5',
    'SSP5-8.5',
    'DeepSD-BC',
    'tasmax',
    'CC-BY-SA-4.0',
    'https://cmip6downscaling.blob.core.windows.net/version1/data/DeepSD-BC/ScenarioMIP.CCCma.CanESM5.ssp585.r1i1p1f1.day.DeepSD-BC.tasmax.zarr',
  ],
  [
    'CanESM5',
    'SSP5-8.5',
    'DeepSD',
    'tasmin',
    'CC-BY-SA-4.0',
    'https://cmip6downscaling.blob.core.windows.net/version1/data/DeepSD/ScenarioMIP.CCCma.CanESM5.ssp585.r1i1p1f1.day.DeepSD.tasmin.zarr',
  ],
  [
    'CanESM5',
    'SSP5-8.5',
    'DeepSD-BC',
    'tasmin',
    'CC-BY-SA-4.0',
    'https://cmip6downscaling.blob.core.windows.net/version1/data/DeepSD-BC/ScenarioMIP.CCCma.CanESM5.ssp585.r1i1p1f1.day.DeepSD-BC.tasmin.zarr',
  ],
  [
    'MRI-ESM2-0',
    'historical',
    'DeepSD',
    'pr',
    'CC-BY-SA-4.0',
    'https://cmip6downscaling.blob.core.windows.net/version1/data/DeepSD/CMIP.MRI.MRI-ESM2-0.historical.r1i1p1f1.day.DeepSD.pr.zarr',
  ],
  [
    'MRI-ESM2-0',
    'historical',
    'DeepSD-BC',
    'pr',
    'CC-BY-SA-4.0',
    'https://cmip6downscaling.blob.core.windows.net/version1/data/DeepSD-BC/CMIP.MRI.MRI-ESM2-0.historical.r1i1p1f1.day.DeepSD-BC.pr.zarr',
  ],
  [
    'MRI-ESM2-0',
    'historical',
    'DeepSD',
    'tasmax',
    'CC-BY-SA-4.0',
    'https://cmip6downscaling.blob.core.windows.net/version1/data/DeepSD/CMIP.MRI.MRI-ESM2-0.historical.r1i1p1f1.day.DeepSD.tasmax.zarr',
  ],
  [
    'MRI-ESM2-0',
    'historical',
    'DeepSD-BC',
    'tasmax',
    'CC-BY-SA-4.0',
    'https://cmip6downscaling.blob.core.windows.net/version1/data/DeepSD-BC/CMIP.MRI.MRI-ESM2-0.historical.r1i1p1f1.day.DeepSD-BC.tasmax.zarr',
  ],
  [
    'MRI-ESM2-0',
    'historical',
    'DeepSD',
    'tasmin',
    'CC-BY-SA-4.0',
    'https://cmip6downscaling.blob.core.windows.net/version1/data/DeepSD/CMIP.MRI.MRI-ESM2-0.historical.r1i1p1f1.day.DeepSD.tasmin.zarr',
  ],
  [
    'MRI-ESM2-0',
    'historical',
    'DeepSD-BC',
    'tasmin',
    'CC-BY-SA-4.0',
    'https://cmip6downscaling.blob.core.windows.net/version1/data/DeepSD-BC/CMIP.MRI.MRI-ESM2-0.historical.r1i1p1f1.day.DeepSD-BC.tasmin.zarr',
  ],
  [
    'MRI-ESM2-0',
    'SSP2-4.5',
    'DeepSD',
    'pr',
    'CC-BY-SA-4.0',
    'https://cmip6downscaling.blob.core.windows.net/version1/data/DeepSD/ScenarioMIP.MRI.MRI-ESM2-0.ssp245.r1i1p1f1.day.DeepSD.pr.zarr',
  ],
  [
    'MRI-ESM2-0',
    'SSP2-4.5',
    'DeepSD-BC',
    'pr',
    'CC-BY-SA-4.0',
    'https://cmip6downscaling.blob.core.windows.net/version1/data/DeepSD-BC/ScenarioMIP.MRI.MRI-ESM2-0.ssp245.r1i1p1f1.day.DeepSD-BC.pr.zarr',
  ],
  [
    'MRI-ESM2-0',
    'SSP2-4.5',
    'DeepSD',
    'tasmax',
    'CC-BY-SA-4.0',
    'https://cmip6downscaling.blob.core.windows.net/version1/data/DeepSD/ScenarioMIP.MRI.MRI-ESM2-0.ssp245.r1i1p1f1.day.DeepSD.tasmax.zarr',
  ],
  [
    'MRI-ESM2-0',
    'SSP2-4.5',
    'DeepSD-BC',
    'tasmax',
    'CC-BY-SA-4.0',
    'https://cmip6downscaling.blob.core.windows.net/version1/data/DeepSD-BC/ScenarioMIP.MRI.MRI-ESM2-0.ssp245.r1i1p1f1.day.DeepSD-BC.tasmax.zarr',
  ],
  [
    'MRI-ESM2-0',
    'SSP2-4.5',
    'DeepSD',
    'tasmin',
    'CC-BY-SA-4.0',
    'https://cmip6downscaling.blob.core.windows.net/version1/data/DeepSD/ScenarioMIP.MRI.MRI-ESM2-0.ssp245.r1i1p1f1.day.DeepSD.tasmin.zarr',
  ],
  [
    'MRI-ESM2-0',
    'SSP2-4.5',
    'DeepSD-BC',
    'tasmin',
    'CC-BY-SA-4.0',
    'https://cmip6downscaling.blob.core.windows.net/version1/data/DeepSD-BC/ScenarioMIP.MRI.MRI-ESM2-0.ssp245.r1i1p1f1.day.DeepSD-BC.tasmin.zarr',
  ],
  [
    'MRI-ESM2-0',
    'SSP3-7.0',
    'DeepSD',
    'pr',
    'CC-BY-SA-4.0',
    'https://cmip6downscaling.blob.core.windows.net/version1/data/DeepSD/ScenarioMIP.MRI.MRI-ESM2-0.SSP3-7.0.r1i1p1f1.day.DeepSD.pr.zarr',
  ],
  [
    'MRI-ESM2-0',
    'SSP3-7.0',
    'DeepSD-BC',
    'pr',
    'CC-BY-SA-4.0',
    'https://cmip6downscaling.blob.core.windows.net/version1/data/DeepSD-BC/ScenarioMIP.MRI.MRI-ESM2-0.SSP3-7.0.r1i1p1f1.day.DeepSD-BC.pr.zarr',
  ],
  [
    'MRI-ESM2-0',
    'SSP3-7.0',
    'DeepSD',
    'tasmax',
    'CC-BY-SA-4.0',
    'https://cmip6downscaling.blob.core.windows.net/version1/data/DeepSD/ScenarioMIP.MRI.MRI-ESM2-0.SSP3-7.0.r1i1p1f1.day.DeepSD.tasmax.zarr',
  ],
  [
    'MRI-ESM2-0',
    'SSP3-7.0',
    'DeepSD-BC',
    'tasmax',
    'CC-BY-SA-4.0',
    'https://cmip6downscaling.blob.core.windows.net/version1/data/DeepSD-BC/ScenarioMIP.MRI.MRI-ESM2-0.SSP3-7.0.r1i1p1f1.day.DeepSD-BC.tasmax.zarr',
  ],
  [
    'MRI-ESM2-0',
    'SSP3-7.0',
    'DeepSD',
    'tasmin',
    'CC-BY-SA-4.0',
    'https://cmip6downscaling.blob.core.windows.net/version1/data/DeepSD/ScenarioMIP.MRI.MRI-ESM2-0.SSP3-7.0.r1i1p1f1.day.DeepSD.tasmin.zarr',
  ],
  [
    'MRI-ESM2-0',
    'SSP3-7.0',
    'DeepSD-BC',
    'tasmin',
    'CC-BY-SA-4.0',
    'https://cmip6downscaling.blob.core.windows.net/version1/data/DeepSD-BC/ScenarioMIP.MRI.MRI-ESM2-0.SSP3-7.0.r1i1p1f1.day.DeepSD-BC.tasmin.zarr',
  ],
  [
    'MRI-ESM2-0',
    'SSP5-8.5',
    'DeepSD',
    'tasmax',
    'CC-BY-SA-4.0',
    'https://cmip6downscaling.blob.core.windows.net/version1/data/DeepSD/ScenarioMIP.MRI.MRI-ESM2-0.ssp585.r1i1p1f1.day.DeepSD.tasmax.zarr',
  ],
  [
    'MRI-ESM2-0',
    'SSP5-8.5',
    'DeepSD-BC',
    'tasmax',
    'CC-BY-SA-4.0',
    'https://cmip6downscaling.blob.core.windows.net/version1/data/DeepSD-BC/ScenarioMIP.MRI.MRI-ESM2-0.ssp585.r1i1p1f1.day.DeepSD-BC.tasmax.zarr',
  ],
  [
    'MRI-ESM2-0',
    'SSP5-8.5',
    'DeepSD',
    'tasmin',
    'CC-BY-SA-4.0',
    'https://cmip6downscaling.blob.core.windows.net/version1/data/DeepSD/ScenarioMIP.MRI.MRI-ESM2-0.ssp585.r1i1p1f1.day.DeepSD.tasmin.zarr',
  ],
  [
    'MRI-ESM2-0',
    'SSP5-8.5',
    'DeepSD-BC',
    'tasmin',
    'CC-BY-SA-4.0',
    'https://cmip6downscaling.blob.core.windows.net/version1/data/DeepSD-BC/ScenarioMIP.MRI.MRI-ESM2-0.ssp585.r1i1p1f1.day.DeepSD-BC.tasmin.zarr',
  ],
  [
    'CanESM5',
    'historical',
    'GARD-SV',
    'pr',
    'CC-BY-SA-4.0',
    'https://cmip6downscaling.blob.core.windows.net/version1/data/GARD-SV/CMIP.CCCma.CanESM5.historical.r1i1p1f1.day.GARD-SV.pr.zarr',
  ],
  [
    'CanESM5',
    'SSP2-4.5',
    'GARD-SV',
    'pr',
    'CC-BY-SA-4.0',
    'https://cmip6downscaling.blob.core.windows.net/version1/data/GARD-SV/ScenarioMIP.CCCma.CanESM5.ssp245.r1i1p1f1.day.GARD-SV.pr.zarr',
  ],
  [
    'CanESM5',
    'SSP3-7.0',
    'GARD-SV',
    'pr',
    'CC-BY-SA-4.0',
    'https://cmip6downscaling.blob.core.windows.net/version1/data/GARD-SV/ScenarioMIP.CCCma.CanESM5.SSP3-7.0.r1i1p1f1.day.GARD-SV.pr.zarr',
  ],
  [
    'CanESM5',
    'SSP5-8.5',
    'GARD-SV',
    'pr',
    'CC-BY-SA-4.0',
    'https://cmip6downscaling.blob.core.windows.net/version1/data/GARD-SV/ScenarioMIP.CCCma.CanESM5.ssp585.r1i1p1f1.day.GARD-SV.pr.zarr',
  ],
  [
    'MIROC6',
    'historical',
    'GARD-SV',
    'pr',
    'CC-BY-4.0',
    'https://cmip6downscaling.blob.core.windows.net/version1/data/GARD-SV/CMIP.MIROC.MIROC6.historical.r1i1p1f1.day.GARD-SV.pr.zarr',
  ],
  [
    'MIROC6',
    'SSP5-8.5',
    'GARD-SV',
    'pr',
    'CC-BY-4.0',
    'https://cmip6downscaling.blob.core.windows.net/version1/data/GARD-SV/ScenarioMIP.MIROC.MIROC6.ssp585.r1i1p1f1.day.GARD-SV.pr.zarr',
  ],
  [
    'MPI-ESM1-2-HR',
    'historical',
    'GARD-SV',
    'pr',
    'CC-BY-SA-4.0',
    'https://cmip6downscaling.blob.core.windows.net/version1/data/GARD-SV/CMIP.MPI-M.MPI-ESM1-2-HR.historical.r1i1p1f1.day.GARD-SV.pr.zarr',
  ],
  [
    'MPI-ESM1-2-HR',
    'SSP2-4.5',
    'GARD-SV',
    'pr',
    'CC-BY-SA-4.0',
    'https://cmip6downscaling.blob.core.windows.net/version1/data/GARD-SV/ScenarioMIP.DKRZ.MPI-ESM1-2-HR.ssp245.r1i1p1f1.day.GARD-SV.pr.zarr',
  ],
  [
    'MPI-ESM1-2-HR',
    'SSP3-7.0',
    'GARD-SV',
    'pr',
    'CC-BY-SA-4.0',
    'https://cmip6downscaling.blob.core.windows.net/version1/data/GARD-SV/ScenarioMIP.DKRZ.MPI-ESM1-2-HR.SSP3-7.0.r1i1p1f1.day.GARD-SV.pr.zarr',
  ],
  [
    'MPI-ESM1-2-HR',
    'SSP5-8.5',
    'GARD-SV',
    'pr',
    'CC-BY-SA-4.0',
    'https://cmip6downscaling.blob.core.windows.net/version1/data/GARD-SV/ScenarioMIP.DKRZ.MPI-ESM1-2-HR.ssp585.r1i1p1f1.day.GARD-SV.pr.zarr',
  ],
  [
    'MRI-ESM2-0',
    'historical',
    'GARD-SV',
    'pr',
    'CC-BY-SA-4.0',
    'https://cmip6downscaling.blob.core.windows.net/version1/data/GARD-SV/CMIP.MRI.MRI-ESM2-0.historical.r1i1p1f1.day.GARD-SV.pr.zarr',
  ],
  [
    'MRI-ESM2-0',
    'SSP2-4.5',
    'GARD-SV',
    'pr',
    'CC-BY-SA-4.0',
    'https://cmip6downscaling.blob.core.windows.net/version1/data/GARD-SV/ScenarioMIP.MRI.MRI-ESM2-0.ssp245.r1i1p1f1.day.GARD-SV.pr.zarr',
  ],
  [
    'MRI-ESM2-0',
    'SSP3-7.0',
    'GARD-SV',
    'pr',
    'CC-BY-SA-4.0',
    'https://cmip6downscaling.blob.core.windows.net/version1/data/GARD-SV/ScenarioMIP.MRI.MRI-ESM2-0.SSP3-7.0.r1i1p1f1.day.GARD-SV.pr.zarr',
  ],
  [
    'MIROC6',
    'historical',
    'GARD-SV',
    'tasmax',
    'CC-BY-4.0',
    'https://cmip6downscaling.blob.core.windows.net/version1/data/GARD-SV/CMIP.MIROC.MIROC6.historical.r1i1p1f1.day.GARD-SV.tasmax.zarr',
  ],
  [
    'MIROC6',
    'historical',
    'GARD-SV',
    'pr',
    'CC-BY-4.0',
    'https://cmip6downscaling.blob.core.windows.net/version1/data/GARD-SV/CMIP.MIROC.MIROC6.historical.r1i1p1f1.day.GARD-SV.pr.zarr',
  ],
  [
    'MRI-ESM2-0',
    'historical',
    'GARD-MV',
    'pr',
    'CC-BY-SA-4.0',
    'https://cmip6downscaling.blob.core.windows.net/version1/data/GARD-MV/CMIP.MRI.MRI-ESM2-0.historical.r1i1p1f1.day.GARD-MV.pr.zarr',
  ],
  [
    'MRI-ESM2-0',
    'historical',
    'GARD-MV',
    'tasmax',
    'CC-BY-SA-4.0',
    'https://cmip6downscaling.blob.core.windows.net/version1/data/GARD-MV/CMIP.MRI.MRI-ESM2-0.historical.r1i1p1f1.day.GARD-MV.tasmax.zarr',
  ],
  [
    'MRI-ESM2-0',
    'SSP2-4.5',
    'GARD-MV',
    'pr',
    'CC-BY-SA-4.0',
    'https://cmip6downscaling.blob.core.windows.net/version1/data/GARD-MV/ScenarioMIP.MRI.MRI-ESM2-0.ssp245.r1i1p1f1.day.GARD-MV.pr.zarr',
  ],
  [
    'MRI-ESM2-0',
    'SSP2-4.5',
    'GARD-MV',
    'tasmax',
    'CC-BY-SA-4.0',
    'https://cmip6downscaling.blob.core.windows.net/version1/data/GARD-MV/ScenarioMIP.MRI.MRI-ESM2-0.ssp245.r1i1p1f1.day.GARD-MV.tasmax.zarr',
  ],
  [
    'NorESM2-LM',
    'historical',
    'GARD-MV',
    'tasmax',
    'CC-BY-4.0',
    'https://cmip6downscaling.blob.core.windows.net/version1/data/GARD-MV/CMIP.NCC.NorESM2-LM.historical.r1i1p1f1.day.GARD-MV.tasmax.zarr',
  ],
  [
    'MRI-ESM2-0',
    'historical',
    'MACA',
    'pr',
    'CC-BY-SA-4.0',
    'https://cmip6downscaling.blob.core.windows.net/version1/data/MACA/CMIP.MRI.MRI-ESM2-0.historical.r1i1p1f1.day.MACA.pr.zarr',
  ],
  [
    'MRI-ESM2-0',
    'historical',
    'MACA',
    'tasmax',
    'CC-BY-SA-4.0',
    'https://cmip6downscaling.blob.core.windows.net/version1/data/MACA/CMIP.MRI.MRI-ESM2-0.historical.r1i1p1f1.day.MACA.tasmax.zarr',
  ],
  [
    'MRI-ESM2-0',
    'historical',
    'MACA',
    'tasmin',
    'CC-BY-SA-4.0',
    'https://cmip6downscaling.blob.core.windows.net/version1/data/MACA/CMIP.MRI.MRI-ESM2-0.historical.r1i1p1f1.day.MACA.tasmin.zarr',
  ],
  [
    'MRI-ESM2-0',
    'historical',
    'MACA',
    'pr',
    'CC-BY-SA-4.0',
    'https://cmip6downscaling.blob.core.windows.net/version1/data/MACA/CMIP.MRI.MRI-ESM2-0.historical.r1i1p1f1.day.MACA.pr.zarr',
  ],
  [
    'MRI-ESM2-0',
    'historical',
    'MACA',
    'tasmax',
    'CC-BY-SA-4.0',
    'https://cmip6downscaling.blob.core.windows.net/version1/data/MACA/CMIP.MRI.MRI-ESM2-0.historical.r1i1p1f1.day.MACA.tasmax.zarr',
  ],
  [
    'MRI-ESM2-0',
    'historical',
    'MACA',
    'tasmin',
    'CC-BY-SA-4.0',
    'https://cmip6downscaling.blob.core.windows.net/version1/data/MACA/CMIP.MRI.MRI-ESM2-0.historical.r1i1p1f1.day.MACA.tasmin.zarr',
  ],
  [
    'MRI-ESM2-0',
    'SSP2-4.5',
    'MACA',
    'tasmax',
    'CC-BY-SA-4.0',
    'https://cmip6downscaling.blob.core.windows.net/version1/data/MACA/ScenarioMIP.MRI.MRI-ESM2-0.ssp245.r1i1p1f1.day.MACA.tasmax.zarr',
  ],
  [
    'MRI-ESM2-0',
    'SSP2-4.5',
    'MACA',
    'tasmin',
    'CC-BY-SA-4.0',
    'https://cmip6downscaling.blob.core.windows.net/version1/data/MACA/ScenarioMIP.MRI.MRI-ESM2-0.ssp245.r1i1p1f1.day.MACA.tasmin.zarr',
  ],
  [
    'MRI-ESM2-0',
    'SSP5-8.5',
    'MACA',
    'pr',
    'CC-BY-SA-4.0',
    'https://cmip6downscaling.blob.core.windows.net/version1/data/MACA/ScenarioMIP.MRI.MRI-ESM2-0.ssp585.r1i1p1f1.day.MACA.pr.zarr',
  ],
  [
    'MRI-ESM2-0',
    'SSP5-8.5',
    'MACA',
    'tasmax',
    'CC-BY-SA-4.0',
    'https://cmip6downscaling.blob.core.windows.net/version1/data/MACA/ScenarioMIP.MRI.MRI-ESM2-0.ssp585.r1i1p1f1.day.MACA.tasmax.zarr',
  ],
  [
    'NorESM2-LM',
    'historical',
    'MACA',
    'pr',
    'CC-BY-4.0',
    'https://cmip6downscaling.blob.core.windows.net/version1/data/MACA/CMIP.NCC.NorESM2-LM.historical.r1i1p1f1.day.MACA.pr.zarr',
  ],
  [
    'NorESM2-LM',
    'historical',
    'MACA',
    'tasmax',
    'CC-BY-4.0',
    'https://cmip6downscaling.blob.core.windows.net/version1/data/MACA/CMIP.NCC.NorESM2-LM.historical.r1i1p1f1.day.MACA.tasmax.zarr',
  ],
  [
    'NorESM2-LM',
    'historical',
    'MACA',
    'pr',
    'CC-BY-4.0',
    'https://cmip6downscaling.blob.core.windows.net/version1/data/MACA/CMIP.NCC.NorESM2-LM.historical.r1i1p1f1.day.MACA.pr.zarr',
  ],
  [
    'NorESM2-LM',
    'historical',
    'MACA',
    'tasmax',
    'CC-BY-4.0',
    'https://cmip6downscaling.blob.core.windows.net/version1/data/MACA/CMIP.NCC.NorESM2-LM.historical.r1i1p1f1.day.MACA.tasmax.zarr',
  ],
  [
    'NorESM2-LM',
    'historical',
    'MACA',
    'tasmin',
    'CC-BY-4.0',
    'https://cmip6downscaling.blob.core.windows.net/version1/data/MACA/CMIP.NCC.NorESM2-LM.historical.r1i1p1f1.day.MACA.tasmin.zarr',
  ],
  [
    'NorESM2-LM',
    'SSP2-4.5',
    'MACA',
    'pr',
    'CC-BY-4.0',
    'https://cmip6downscaling.blob.core.windows.net/version1/data/MACA/ScenarioMIP.NCC.NorESM2-LM.ssp245.r1i1p1f1.day.MACA.pr.zarr',
  ],
  [
    'NorESM2-LM',
    'SSP2-4.5',
    'MACA',
    'tasmax',
    'CC-BY-4.0',
    'https://cmip6downscaling.blob.core.windows.net/version1/data/MACA/ScenarioMIP.NCC.NorESM2-LM.ssp245.r1i1p1f1.day.MACA.tasmax.zarr',
  ],
  [
    'NorESM2-LM',
    'SSP2-4.5',
    'MACA',
    'tasmin',
    'CC-BY-4.0',
    'https://cmip6downscaling.blob.core.windows.net/version1/data/MACA/ScenarioMIP.NCC.NorESM2-LM.ssp245.r1i1p1f1.day.MACA.tasmin.zarr',
  ],
  [
    'BCC-CSM2-MR',
    'historical',
    'GARD-SV',
    'tasmax',
    'CC-BY-SA-4.0',
    'https://cmip6downscaling.blob.core.windows.net/version1/data/GARD-SV/CMIP.BCC.BCC-CSM2-MR.historical.r1i1p1f1.day.GARD-SV.tasmax.zarr',
  ],
  [
    'BCC-CSM2-MR',
    'historical',
    'GARD-SV',
    'tasmin',
    'CC-BY-SA-4.0',
    'https://cmip6downscaling.blob.core.windows.net/version1/data/GARD-SV/CMIP.BCC.BCC-CSM2-MR.historical.r1i1p1f1.day.GARD-SV.tasmin.zarr',
  ],
  [
    'BCC-CSM2-MR',
    'SSP2-4.5',
    'GARD-SV',
    'tasmax',
    'CC-BY-SA-4.0',
    'https://cmip6downscaling.blob.core.windows.net/version1/data/GARD-SV/ScenarioMIP.BCC.BCC-CSM2-MR.ssp245.r1i1p1f1.day.GARD-SV.tasmax.zarr',
  ],
  [
    'BCC-CSM2-MR',
    'SSP2-4.5',
    'GARD-SV',
    'tasmin',
    'CC-BY-SA-4.0',
    'https://cmip6downscaling.blob.core.windows.net/version1/data/GARD-SV/ScenarioMIP.BCC.BCC-CSM2-MR.ssp245.r1i1p1f1.day.GARD-SV.tasmin.zarr',
  ],
  [
    'BCC-CSM2-MR',
    'SSP3-7.0',
    'GARD-SV',
    'tasmax',
    'CC-BY-SA-4.0',
    'https://cmip6downscaling.blob.core.windows.net/version1/data/GARD-SV/ScenarioMIP.BCC.BCC-CSM2-MR.SSP3-7.0.r1i1p1f1.day.GARD-SV.tasmax.zarr',
  ],
  [
    'BCC-CSM2-MR',
    'SSP3-7.0',
    'GARD-SV',
    'tasmin',
    'CC-BY-SA-4.0',
    'https://cmip6downscaling.blob.core.windows.net/version1/data/GARD-SV/ScenarioMIP.BCC.BCC-CSM2-MR.SSP3-7.0.r1i1p1f1.day.GARD-SV.tasmin.zarr',
  ],
  [
    'BCC-CSM2-MR',
    'SSP5-8.5',
    'GARD-SV',
    'tasmax',
    'CC-BY-SA-4.0',
    'https://cmip6downscaling.blob.core.windows.net/version1/data/GARD-SV/ScenarioMIP.BCC.BCC-CSM2-MR.ssp585.r1i1p1f1.day.GARD-SV.tasmax.zarr',
  ],
  [
    'BCC-CSM2-MR',
    'SSP5-8.5',
    'GARD-SV',
    'tasmin',
    'CC-BY-SA-4.0',
    'https://cmip6downscaling.blob.core.windows.net/version1/data/GARD-SV/ScenarioMIP.BCC.BCC-CSM2-MR.ssp585.r1i1p1f1.day.GARD-SV.tasmin.zarr',
  ],
  [
    'CanESM5',
    'historical',
    'GARD-SV',
    'tasmax',
    'CC-BY-SA-4.0',
    'https://cmip6downscaling.blob.core.windows.net/version1/data/GARD-SV/CMIP.CCCma.CanESM5.historical.r1i1p1f1.day.GARD-SV.tasmax.zarr',
  ],
  [
    'CanESM5',
    'historical',
    'GARD-SV',
    'tasmin',
    'CC-BY-SA-4.0',
    'https://cmip6downscaling.blob.core.windows.net/version1/data/GARD-SV/CMIP.CCCma.CanESM5.historical.r1i1p1f1.day.GARD-SV.tasmin.zarr',
  ],
  [
    'CanESM5',
    'SSP2-4.5',
    'GARD-SV',
    'pr',
    'CC-BY-SA-4.0',
    'https://cmip6downscaling.blob.core.windows.net/version1/data/GARD-SV/ScenarioMIP.CCCma.CanESM5.ssp245.r1i1p1f1.day.GARD-SV.pr.zarr',
  ],
  [
    'CanESM5',
    'SSP2-4.5',
    'GARD-SV',
    'tasmax',
    'CC-BY-SA-4.0',
    'https://cmip6downscaling.blob.core.windows.net/version1/data/GARD-SV/ScenarioMIP.CCCma.CanESM5.ssp245.r1i1p1f1.day.GARD-SV.tasmax.zarr',
  ],
  [
    'CanESM5',
    'SSP2-4.5',
    'GARD-SV',
    'tasmin',
    'CC-BY-SA-4.0',
    'https://cmip6downscaling.blob.core.windows.net/version1/data/GARD-SV/ScenarioMIP.CCCma.CanESM5.ssp245.r1i1p1f1.day.GARD-SV.tasmin.zarr',
  ],
  [
    'CanESM5',
    'SSP3-7.0',
    'GARD-SV',
    'tasmax',
    'CC-BY-SA-4.0',
    'https://cmip6downscaling.blob.core.windows.net/version1/data/GARD-SV/ScenarioMIP.CCCma.CanESM5.SSP3-7.0.r1i1p1f1.day.GARD-SV.tasmax.zarr',
  ],
  [
    'CanESM5',
    'SSP3-7.0',
    'GARD-SV',
    'tasmin',
    'CC-BY-SA-4.0',
    'https://cmip6downscaling.blob.core.windows.net/version1/data/GARD-SV/ScenarioMIP.CCCma.CanESM5.SSP3-7.0.r1i1p1f1.day.GARD-SV.tasmin.zarr',
  ],
  [
    'CanESM5',
    'SSP5-8.5',
    'GARD-SV',
    'tasmax',
    'CC-BY-SA-4.0',
    'https://cmip6downscaling.blob.core.windows.net/version1/data/GARD-SV/ScenarioMIP.CCCma.CanESM5.ssp585.r1i1p1f1.day.GARD-SV.tasmax.zarr',
  ],
  [
    'CanESM5',
    'SSP5-8.5',
    'GARD-SV',
    'tasmin',
    'CC-BY-SA-4.0',
    'https://cmip6downscaling.blob.core.windows.net/version1/data/GARD-SV/ScenarioMIP.CCCma.CanESM5.ssp585.r1i1p1f1.day.GARD-SV.tasmin.zarr',
  ],
  [
    'MIROC6',
    'historical',
    'GARD-SV',
    'tasmax',
    'CC-BY-4.0',
    'https://cmip6downscaling.blob.core.windows.net/version1/data/GARD-SV/CMIP.MIROC.MIROC6.historical.r1i1p1f1.day.GARD-SV.tasmax.zarr',
  ],
  [
    'MIROC6',
    'historical',
    'GARD-SV',
    'tasmin',
    'CC-BY-4.0',
    'https://cmip6downscaling.blob.core.windows.net/version1/data/GARD-SV/CMIP.MIROC.MIROC6.historical.r1i1p1f1.day.GARD-SV.tasmin.zarr',
  ],
  [
    'MIROC6',
    'SSP2-4.5',
    'GARD-SV',
    'tasmax',
    'CC-BY-4.0',
    'https://cmip6downscaling.blob.core.windows.net/version1/data/GARD-SV/ScenarioMIP.MIROC.MIROC6.ssp245.r1i1p1f1.day.GARD-SV.tasmax.zarr',
  ],
  [
    'MIROC6',
    'SSP2-4.5',
    'GARD-SV',
    'tasmin',
    'CC-BY-4.0',
    'https://cmip6downscaling.blob.core.windows.net/version1/data/GARD-SV/ScenarioMIP.MIROC.MIROC6.ssp245.r1i1p1f1.day.GARD-SV.tasmin.zarr',
  ],
  [
    'MIROC6',
    'SSP3-7.0',
    'GARD-SV',
    'tasmax',
    'CC-BY-4.0',
    'https://cmip6downscaling.blob.core.windows.net/version1/data/GARD-SV/ScenarioMIP.MIROC.MIROC6.SSP3-7.0.r1i1p1f1.day.GARD-SV.tasmax.zarr',
  ],
  [
    'MIROC6',
    'SSP3-7.0',
    'GARD-SV',
    'tasmin',
    'CC-BY-4.0',
    'https://cmip6downscaling.blob.core.windows.net/version1/data/GARD-SV/ScenarioMIP.MIROC.MIROC6.SSP3-7.0.r1i1p1f1.day.GARD-SV.tasmin.zarr',
  ],
  [
    'MIROC6',
    'SSP5-8.5',
    'GARD-SV',
    'tasmax',
    'CC-BY-4.0',
    'https://cmip6downscaling.blob.core.windows.net/version1/data/GARD-SV/ScenarioMIP.MIROC.MIROC6.ssp585.r1i1p1f1.day.GARD-SV.tasmax.zarr',
  ],
  [
    'MIROC6',
    'SSP5-8.5',
    'GARD-SV',
    'tasmin',
    'CC-BY-4.0',
    'https://cmip6downscaling.blob.core.windows.net/version1/data/GARD-SV/ScenarioMIP.MIROC.MIROC6.ssp585.r1i1p1f1.day.GARD-SV.tasmin.zarr',
  ],
  [
    'MPI-ESM1-2-HR',
    'historical',
    'GARD-SV',
    'tasmax',
    'CC-BY-SA-4.0',
    'https://cmip6downscaling.blob.core.windows.net/version1/data/GARD-SV/CMIP.MPI-M.MPI-ESM1-2-HR.historical.r1i1p1f1.day.GARD-SV.tasmax.zarr',
  ],
  [
    'MPI-ESM1-2-HR',
    'historical',
    'GARD-SV',
    'tasmin',
    'CC-BY-SA-4.0',
    'https://cmip6downscaling.blob.core.windows.net/version1/data/GARD-SV/CMIP.MPI-M.MPI-ESM1-2-HR.historical.r1i1p1f1.day.GARD-SV.tasmin.zarr',
  ],
  [
    'MPI-ESM1-2-HR',
    'SSP2-4.5',
    'GARD-SV',
    'tasmax',
    'CC-BY-SA-4.0',
    'https://cmip6downscaling.blob.core.windows.net/version1/data/GARD-SV/ScenarioMIP.DKRZ.MPI-ESM1-2-HR.ssp245.r1i1p1f1.day.GARD-SV.tasmax.zarr',
  ],
  [
    'MPI-ESM1-2-HR',
    'SSP2-4.5',
    'GARD-SV',
    'tasmin',
    'CC-BY-SA-4.0',
    'https://cmip6downscaling.blob.core.windows.net/version1/data/GARD-SV/ScenarioMIP.DKRZ.MPI-ESM1-2-HR.ssp245.r1i1p1f1.day.GARD-SV.tasmin.zarr',
  ],
  [
    'MPI-ESM1-2-HR',
    'SSP3-7.0',
    'GARD-SV',
    'tasmax',
    'CC-BY-SA-4.0',
    'https://cmip6downscaling.blob.core.windows.net/version1/data/GARD-SV/ScenarioMIP.DKRZ.MPI-ESM1-2-HR.SSP3-7.0.r1i1p1f1.day.GARD-SV.tasmax.zarr',
  ],
  [
    'MPI-ESM1-2-HR',
    'SSP3-7.0',
    'GARD-SV',
    'tasmin',
    'CC-BY-SA-4.0',
    'https://cmip6downscaling.blob.core.windows.net/version1/data/GARD-SV/ScenarioMIP.DKRZ.MPI-ESM1-2-HR.SSP3-7.0.r1i1p1f1.day.GARD-SV.tasmin.zarr',
  ],
  [
    'MPI-ESM1-2-HR',
    'SSP5-8.5',
    'GARD-SV',
    'tasmax',
    'CC-BY-SA-4.0',
    'https://cmip6downscaling.blob.core.windows.net/version1/data/GARD-SV/ScenarioMIP.DKRZ.MPI-ESM1-2-HR.ssp585.r1i1p1f1.day.GARD-SV.tasmax.zarr',
  ],
  [
    'MPI-ESM1-2-HR',
    'SSP5-8.5',
    'GARD-SV',
    'tasmin',
    'CC-BY-SA-4.0',
    'https://cmip6downscaling.blob.core.windows.net/version1/data/GARD-SV/ScenarioMIP.DKRZ.MPI-ESM1-2-HR.ssp585.r1i1p1f1.day.GARD-SV.tasmin.zarr',
  ],
  [
    'MRI-ESM2-0',
    'historical',
    'GARD-SV',
    'tasmax',
    'CC-BY-SA-4.0',
    'https://cmip6downscaling.blob.core.windows.net/version1/data/GARD-SV/CMIP.MRI.MRI-ESM2-0.historical.r1i1p1f1.day.GARD-SV.tasmax.zarr',
  ],
  [
    'MRI-ESM2-0',
    'historical',
    'GARD-SV',
    'tasmin',
    'CC-BY-SA-4.0',
    'https://cmip6downscaling.blob.core.windows.net/version1/data/GARD-SV/CMIP.MRI.MRI-ESM2-0.historical.r1i1p1f1.day.GARD-SV.tasmin.zarr',
  ],
  [
    'MRI-ESM2-0',
    'SSP2-4.5',
    'GARD-SV',
    'tasmax',
    'CC-BY-SA-4.0',
    'https://cmip6downscaling.blob.core.windows.net/version1/data/GARD-SV/ScenarioMIP.MRI.MRI-ESM2-0.ssp245.r1i1p1f1.day.GARD-SV.tasmax.zarr',
  ],
  [
    'MRI-ESM2-0',
    'SSP2-4.5',
    'GARD-SV',
    'tasmin',
    'CC-BY-SA-4.0',
    'https://cmip6downscaling.blob.core.windows.net/version1/data/GARD-SV/ScenarioMIP.MRI.MRI-ESM2-0.ssp245.r1i1p1f1.day.GARD-SV.tasmin.zarr',
  ],
  [
    'MRI-ESM2-0',
    'SSP3-7.0',
    'GARD-SV',
    'tasmax',
    'CC-BY-SA-4.0',
    'https://cmip6downscaling.blob.core.windows.net/version1/data/GARD-SV/ScenarioMIP.MRI.MRI-ESM2-0.SSP3-7.0.r1i1p1f1.day.GARD-SV.tasmax.zarr',
  ],
  [
    'MRI-ESM2-0',
    'SSP3-7.0',
    'GARD-SV',
    'tasmin',
    'CC-BY-SA-4.0',
    'https://cmip6downscaling.blob.core.windows.net/version1/data/GARD-SV/ScenarioMIP.MRI.MRI-ESM2-0.SSP3-7.0.r1i1p1f1.day.GARD-SV.tasmin.zarr',
  ],
  [
    'MRI-ESM2-0',
    'SSP5-8.5',
    'GARD-SV',
    'tasmax',
    'CC-BY-SA-4.0',
    'https://cmip6downscaling.blob.core.windows.net/version1/data/GARD-SV/ScenarioMIP.MRI.MRI-ESM2-0.ssp585.r1i1p1f1.day.GARD-SV.tasmax.zarr',
  ],
  [
    'MRI-ESM2-0',
    'SSP5-8.5',
    'GARD-SV',
    'tasmin',
    'CC-BY-SA-4.0',
    'https://cmip6downscaling.blob.core.windows.net/version1/data/GARD-SV/ScenarioMIP.MRI.MRI-ESM2-0.ssp585.r1i1p1f1.day.GARD-SV.tasmin.zarr',
  ],
]

const DataTable = () => {
  return (
    <Box
      sx={{
        fontSize: [2, 2, 2, 3],
        fontFamily: 'faux',
        letterSpacing: 'faux',
        mt: [5],
      }}
    >
      {data.map((d, i) => {
        return (
          <Box
            key={i}
            sx={{
              mb: [4],
              pt: [4],
              borderTop: ({ colors }) => `solid 1px ${colors.muted}`,
            }}
          >
            <Row columns={3}>
              <Column start={1} width={1}>
                {d[0]}
              </Column>
              <Column start={2} width={1} sx={{ textTransform: 'uppercase' }}>
                {d[2]}
              </Column>
              <Column start={3} width={1}>
                {d[4]}
              </Column>
            </Row>
            <Row columns={3}>
              <Column start={1} width={1}>
                {d[1]}
              </Column>
              <Column start={2} width={2}>
                {d[3]}
              </Column>
            </Row>
            <Row columns={3} sx={{ mt: [3] }}>
              <Column
                start={1}
                width={3}
                sx={{
                  fontSize: [1, 1, 1, 2],
                  wordBreak: 'break-all',
                  color: 'secondary',
                }}
              >
                {d[5]}
              </Column>
            </Row>
          </Box>
        )
      })}
    </Box>
  )
}

export default DataTable
