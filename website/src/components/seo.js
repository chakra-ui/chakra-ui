import { useLocation } from "@reach/router"
import { graphql, useStaticQuery } from "gatsby"
import React from "react"
import Helmet from "react-helmet"

function SEO({ title, description, slug, isArticle }) {
  const { pathname } = useLocation()
  const data = useStaticQuery(query)
  const defaults = data.site.siteMetadata

  const seo = {
    title: title || defaults.title,
    description: description || defaults.defaultDescription,
    image: defaults.image,
    titleTemplate: defaults.titleTemplate,
    twitterImage: defaults.twitter.image,
    twitter: defaults.twitter.username,
    url: `${defaults.siteUrl}${slug || pathname}`,
    isArticle: !!isArticle,
  }

  return (
    <Helmet title={seo.title} titleTemplate={seo.titleTemplate}>
      <link rel="canonical" href={seo.url} />
      <meta name="description" content={seo.description} />
      <meta name="image" content={seo.image} />
      <meta property="og:url" content={seo.url} />
      <meta
        property="og:type"
        content={seo.isArticle ? "article" : "website"}
      />
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:image" content={seo.image} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content={seo.twitter} />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={seo.twitterImage} />
    </Helmet>
  )
}

export default SEO

const query = graphql`
  query SEO {
    site {
      siteMetadata {
        title
        description
        titleTemplate
        siteUrl
        image
        twitter {
          username
          image
        }
      }
    }
  }
`
