import { Box, Flex, Heading, Text, Link } from "@chakra-ui/core"
import { useLocation } from "@reach/router"
import { graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import React from "react"
import { GithubLink } from "../components/github-edit-link"
import SEO from "../components/seo"

function LastEdited(props) {
  const { updatedAt, editUrl, ...rest } = props
  return (
    <Flex
      as="footer"
      alignItems="center"
      justifyContent="space-between"
      {...rest}
    >
      <Box fontSize="sm" opacity={0.7}>
        Last updated: {updatedAt}
      </Box>
      <GithubLink path={editUrl} />
    </Flex>
  )
}

const Body = (props) => {
  const {
    title,
    description,
    contributors,
    relativePath,
    body,
    updatedAt,
  } = props
  const creator = contributors[0]
  return (
    <Box mx="auto" maxW="48rem" py="3rem">
      <Heading size="xl" as="h1" fontWeight="semibold">
        {title}
      </Heading>
      <Text opacity={0.7} mt="4">
        {description}
      </Text>
      {creator && (
        <Text>
          by{" "}
          <Link href={creator.url} isExternal>
            {creator.name}
          </Link>
        </Text>
      )}
      <Box as="hr" my="8" borderStyle="dashed" />
      <MDXRenderer>{body}</MDXRenderer>
      {relativePath && (
        <LastEdited mt="3rem" updatedAt={updatedAt} editUrl={relativePath} />
      )}
    </Box>
  )
}

const Guides = ({ data, pageContext }) => {
  const location = useLocation()
  const { slug, relativePath, updatedAt } = pageContext
  const { body, frontmatter, fields, tableOfContents } = data.mdx
  const { title, description } = frontmatter
  const { contributors } = fields

  return (
    <>
      <SEO title={title} description={description} slug={slug} />
      <Body
        pathname={location.pathname}
        body={body}
        title={title}
        description={description}
        slug={slug}
        tableOfContents={tableOfContents}
        contributors={contributors}
        relativePath={relativePath}
        updatedAt={updatedAt}
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
          url
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
