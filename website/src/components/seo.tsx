import React from "react"
import { NextSeo, NextSeoProps } from "next-seo"
import siteConfig from "configs/site-config"

export interface SEOProps extends Pick<NextSeoProps, "title" | "description"> {}

const SEO = ({ title, description }: SEOProps) => (
  <NextSeo
    title={title}
    description={description}
    openGraph={{ title, description }}
    titleTemplate={siteConfig.seo.titleTemplate}
  />
)

export default SEO
