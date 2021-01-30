import siteConfig from "configs/site-config"

export function getSeo({
  omitOpenGraphImage,
}: {
  omitOpenGraphImage: boolean
}) {
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
