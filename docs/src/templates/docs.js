import React from "react"
import { graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import SEO from "../components/seo"

const Docs = ({ data }) => {
  const { body, frontmatter, fields } = data.mdx
  const { title, description } = frontmatter
  const { slug } = fields

  return (
    <>
      <SEO title={title} description={description} slug={slug} />
      <MDXRenderer>{body}</MDXRenderer>
    </>
  )
}

// query for page's `body`, `title`, and `description` using the page's `slug`
export const query = graphql`
  query docBySlug($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      body
      frontmatter {
        title
        description
      }
      fields {
        slug
      }
    }
  }
`

export default Docs
