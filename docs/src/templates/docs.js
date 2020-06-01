import React from "react"
import { Box, Flex } from "@chakra-ui/core"
import { graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { GithubLink } from "../components/github-edit-link"
import { Pagination } from "../components/pagination"
import SEO from "../components/seo"

const Docs = ({ data, pageContext }) => {
  const { previous, next, slug, relativePath, modifiedTime } = pageContext
  const { body, frontmatter } = data.mdx
  const { title, description } = frontmatter

  return (
    <>
      <SEO title={title} description={description} slug={slug} />
      <Box mx="auto" maxW="46rem" mt="1em">
        <MDXRenderer>{body}</MDXRenderer>
        <Pagination previous={previous} next={next} />
        {relativePath && (
          <Flex
            as="footer"
            mt={12}
            alignItems="center"
            justifyContent="space-between"
          >
            <Box fontSize="sm" opacity={0.7}>
              Last Edited: {modifiedTime}
            </Box>
            <GithubLink path={relativePath} />
          </Flex>
        )}
      </Box>
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
      tableOfContents
    }
  }
`

export default Docs
