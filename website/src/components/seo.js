import React from "react"
import { NextSeo } from "next-seo"
import seoConfig from "seo.config"

function SEO({ title, description }) {
  return (
    <NextSeo
      title={title}
      description={description}
      titleTemplate={seoConfig.titleTemplate}
    />
  )
}

export default SEO
