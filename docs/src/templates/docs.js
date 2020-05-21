import React from "react"
import { Box, Flex } from "@chakra-ui/core"
import { graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import SEO from "../components/seo"
import { TableOfContents } from "../components/toc"
import { Pagination } from "../components/pagination"

const Docs = ({ data, pageContext }) => {
  const { previous, next } = pageContext
  const { body, frontmatter, fields, tableOfContents } = data.mdx
  const { title, description } = frontmatter
  const { slug } = fields

  console.log("previous", previous)
  console.log("next", next)

  return (
    <>
      <SEO title={title} description={description} slug={slug} />
      <Flex>
        <Box>
          <MDXRenderer>{body}</MDXRenderer>
          <Pagination previous={previous} next={next} />
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
