import siteConfig from "configs/site-config"

type GetSeoOptions = {
  omitOpenGraphImage?: boolean
}

export function getSeo(options: GetSeoOptions = {}) {
  const { omitOpenGraphImage } = options
  const { seo } = siteConfig
  const { images, ...openGraph } = seo.openGraph

  return {
    ...seo,
    openGraph: {
      ...openGraph,
      images: omitOpenGraphImage ? undefined : images,
    },
  }
}
