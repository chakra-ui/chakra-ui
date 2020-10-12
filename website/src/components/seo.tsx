import { siteConfig } from "configs/site-config"
import { NextSeo } from "next-seo"

type SeoProps = {
  title: string
  description: string
}

export const SEO = ({ title, description }: SeoProps): JSX.Element => (
  <NextSeo
    title={title}
    description={description}
    titleTemplate={siteConfig.seo.titleTemplate}
  />
)
