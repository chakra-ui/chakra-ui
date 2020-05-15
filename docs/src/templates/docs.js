import React from "react"
import { graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import SEO from "../components/seo"

const Docs = ({ data }) => {
  const { body, frontmatter } = data.mdx
  const { title, description } = frontmatter

  return (
    <>
      <SEO title={title} description={description} />
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
    }
  }
`

export default Docs
