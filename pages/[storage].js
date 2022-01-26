import Index from '../tool/index.js'

const CATALOG_MAP = {
  us: 'https://cmip6downscaling.blob.core.windows.net/scratch/cmip6-web-test-8/catalog.json',
  eu: 'https://cmip6downscaling.blob.core.windows.net/scratch/cmip6-web-test-8/catalog.json',
}

export default Index

export async function getStaticProps({ params }) {
  const catalogLocation = CATALOG_MAP[params.storage]
  const res = await fetch(catalogLocation)
  const data = await res.json()

  // For illustration purposes only
  const catalog = data.datasets.map((d) => ({
    ...d,
    name: `${params.storage} ${d.name}`,
  }))

  return { props: { catalog } }
}

export function getStaticPaths() {
  const paths = Object.keys(CATALOG_MAP).map((storage) => ({
    params: { storage },
  }))

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false }
}
