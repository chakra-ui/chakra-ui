import * as React from "react"
import { useStaticQuery, graphql, Link as GatsbyLink } from "gatsby"
import {
  Box,
  Heading,
  Text,
  Container,
  Stack,
  Avatar,
  chakra,
  Badge,
} from "@chakra-ui/core"
import SEO from "../components/seo"

function GuidePreview(props) {
  const {
    title,
    children,
    createdAt,
    birthTime,
    url,
    contributors,
    tags,
    ...rest
  } = props
  const creator = contributors[0] || {}
  return (
    <Box as="article" {...rest}>
      <Heading mb="3" color="teal.500" lineHeight="1.4" size="md">
        <chakra.a
          as={GatsbyLink}
          to={url}
          _hover={{ color: "teal.600", textDecor: "underline" }}
        >
          {title}
        </chakra.a>
      </Heading>

      <Text as="time" opacity={0.7} fontSize="sm" dateTime={birthTime}>
        {createdAt}
      </Text>

      <Stack mt="5" align="center" direction="row">
        {/* <Avatar size="sm" name={creator.name} src={creator.image} /> */}
        <Text fontSize="sm" fontWeight="semibold">
          <chakra.a
            href={creator.url}
            target="__blank"
            _hover={{ textDecor: "underline" }}
          >
            {creator.name}
          </chakra.a>
        </Text>
      </Stack>

      <Text mt="3">{children}</Text>

      <Stack mt="4" direction="row" align="baseline">
        <Text fontWeight="bold" fontSize="sm">
          Tags:
        </Text>
        {tags.map((tag) => (
          <Badge colorScheme="teal" key={tag}>
            {tag}
          </Badge>
        ))}
      </Stack>
    </Box>
  )
}

function Guides() {
  const { allMdx } = useStaticQuery(graphql`
    query AllGuides {
      allMdx(filter: { fields: { source: { eq: "guides" } } }) {
        nodes {
          fields {
            slug
            contributors {
              name
              image
              url
            }
          }
          excerpt
          frontmatter {
            title
            tags
          }
          parent {
            ... on File {
              birthTime
              createdAt: birthTime(formatString: "MMMM DD, YYYY")
            }
          }
        }
      }
    }
  `)

  return (
    <>
      <SEO
        title="Chakra UI Guides"
        description="Community-created guides for using Chakra UI"
        slug="/guides"
      />
      <Box py="56px">
        <Box py="80px">
          <Container maxWidth="md">
            <Heading as="h1" size="xl" mb="3">
              Guides
            </Heading>
            <Text>A list of guides for using Chakra UI with any project.</Text>
          </Container>
        </Box>
        <Container maxWidth="md">
          <Stack spacing="4rem">
            {allMdx.nodes.map(
              ({
                fields: { contributors, slug },
                frontmatter: { title, tags },
                parent: { createdAt, birthTime },
                excerpt,
              }) => (
                <GuidePreview
                  key={title}
                  url={slug}
                  title={title}
                  birthTime={birthTime}
                  createdAt={createdAt}
                  contributors={contributors}
                  tags={tags}
                >
                  {excerpt}
                </GuidePreview>
              ),
            )}
          </Stack>
        </Container>
      </Box>
    </>
  )
}

export default Guides
