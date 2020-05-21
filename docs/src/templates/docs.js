import React from "react"
import { Box, Flex } from "@chakra-ui/core"
import { graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import SEO from "../components/seo"
import { TableOfContents } from "../components/toc"

const Docs = ({ data }) => {
  const { body, frontmatter, fields, tableOfContents } = data.mdx
  const { title, description } = frontmatter
  const { slug } = fields

  return (
    <>
      <SEO title={title} description={description} slug={slug} />
      <Flex>
        <Box>
          <MDXRenderer>{body}</MDXRenderer>
        </Box>
        <TableOfContents tableOfContents={tableOfContents} />
      </Flex>
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
      tableOfContents
    }
  }
`

export default Docs
