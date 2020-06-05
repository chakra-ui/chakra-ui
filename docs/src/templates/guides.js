import { Box, Flex } from "@chakra-ui/core"
import { useLocation } from "@reach/router"
import { graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import React from "react"
import { GithubLink } from "../components/github-edit-link"
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
  const { contributors, relativePath, body, modifiedTime } = props
  return (
    <Box mx="auto" maxW="48rem" mt="1em">
      <MDXRenderer>{body}</MDXRenderer>
      {relativePath && (
        <LastEdited
          mt="3rem"
          modifiedTime={modifiedTime}
          editUrl={relativePath}
        />
      )}
    </Box>
  )
}

const Guides = ({ data, pageContext }) => {
  const location = useLocation()
  const { previous, next, slug, relativePath, modifiedTime } = pageContext
  const { body, frontmatter, fields, tableOfContents } = data.mdx
  const { title, description } = frontmatter
  const { contributors } = fields

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
        contributors={contributors}
        relativePath={relativePath}
        modifiedTime={modifiedTime}
      />
    </>
  )
}

// query for page's `body`, `title`, and `description` using the page's `slug`
export const query = graphql`
  query guideBySlug($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      body
      fields {
        contributors {
          name
          image
        }
      }
      frontmatter {
        title
        description
      }
      tableOfContents
    }
  }
`

export default Guides
