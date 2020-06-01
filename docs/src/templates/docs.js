import { Box, Flex } from "@chakra-ui/core"
import { useLocation } from "@reach/router"
import { graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import React from "react"
import { GithubLink } from "../components/github-edit-link"
import { Pagination } from "../components/pagination"
import SEO from "../components/seo"

function LastEdited(props) {
  const { modifiedTime, editUrl, ...rest } = props
  return (
    <Flex
      as="footer"
      alignItems="center"
      justifyContent="space-between"
      {...rest}
    >
      <Box fontSize="sm" opacity={0.7}>
        Last updated: {modifiedTime}
      </Box>
      <GithubLink path={editUrl} />
    </Flex>
  )
}

// memoized to prevent from re-rendering on in-page anchor link navigation
const Body = (props) => {
  const { relativePath, body, previous, next, modifiedTime } = props
  return (
    <Box mx="auto" maxW="46rem" mt="1em">
      <MDXRenderer>{body}</MDXRenderer>
      {relativePath && (
        <LastEdited
          mt="3rem"
          modifiedTime={modifiedTime}
          editUrl={relativePath}
        />
      )}
      <Pagination mt="4rem" mb="80px" previous={previous} next={next} />
    </Box>
  )
}

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
