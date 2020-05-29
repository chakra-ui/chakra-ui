import React from "react"
import { useLocation } from "@reach/router"
import { Box, Flex, Stack } from "@chakra-ui/core"
import { graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import SEO from "../components/seo"
import { TableOfContents } from "../components/toc"
import { Pagination } from "../components/pagination"
import { GithubLink } from "../components/github-edit-link"

// memoized to prevent from re-rendering on in-page anchor link navigation
const Body = React.memo(
  ({ body, previous, next, slug, tableOfContents }) => {
    return (
      <Flex position="relative" justifyContent="center">
        <Stack direction="row" spacing={12} mt="1em">
          <Box maxW="46rem" w="full">
            <MDXRenderer>{body}</MDXRenderer>
            <Pagination previous={previous} next={next} />
          </Box>
          <Box
            display={{ xs: "none", lg: "block" }}
            position="sticky"
            top="6rem"
            as="aside"
            w={48}
          >
            <TableOfContents slug={slug} tableOfContents={tableOfContents} />
          </Box>
        </Stack>
      </Flex>
    )
  },
  (prev, next) => prev.pathname === next.pathname,
)

const Docs = ({ data, pageContext }) => {
  const location = useLocation()
  const { previous, next, slug, relativePath } = pageContext
  const { body, frontmatter, tableOfContents } = data.mdx
  const { title, description } = frontmatter

  return (
    <>
      <SEO title={title} description={description} slug={slug} />
      <Body
        pathname={location.pathname}
        body={body}
        previous={previous}
        next={next}
        slug={slug}
        tableOfContents={tableOfContents}
      />
      {relativePath && (
        <Flex as="footer" mt={12} alignItems="center" justifyContent="center">
          <GithubLink path={relativePath} />
        </Flex>
      )}
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
