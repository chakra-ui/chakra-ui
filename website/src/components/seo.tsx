import React from "react"
import { NextSeo } from "next-seo"
import seoConfig from "seo.config"

const SEO = ({ title, description }) => (
  <NextSeo
    title={title}
    description={description}
    titleTemplate={seoConfig.titleTemplate}
  />
)

export default SEO
