import { Box, Flex, Stack } from "@chakra-ui/core"
import { useLocation } from "@reach/router"
import { graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import React from "react"
import { GithubLink } from "../components/github-edit-link"
import { Pagination } from "../components/pagination"
import SEO from "../components/seo"

// memoized to prevent from re-rendering on in-page anchor link navigation
const Body = React.memo(
  (props) => {
    const { relativePath, body, previous, next, modifiedTime } = props
    return (
      <Flex position="relative" justifyContent="center">
        <Stack direction="row" spacing={12} mt="1em">
          <Box maxW="46rem" w="full">
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
          {/* <Box
            display={{ base: "none", lg: "block" }}
            position="sticky"
            top="6rem"
            as="aside"
            w={48}
          >
            <TableOfContents slug={slug} tableOfContents={tableOfContents} />
          </Box> */}
        </Stack>
      </Flex>
    )
  },
  (prev, next) => prev.pathname === next.pathname,
)

const Docs = ({ data, pageContext }) => {
  const location = useLocation()
  const { previous, next, slug, relativePath, modifiedTime } = pageContext
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
        relativePath={relativePath}
        modifiedTime={modifiedTime}
      />
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
