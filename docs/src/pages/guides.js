import * as React from "react"
import { useStaticQuery, graphql, Link as GatsbyLink } from "gatsby"
import {
  Box,
  Heading,
  Text,
  Container,
  Stack,
  Flex,
  Avatar,
  chakra,
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
    ...rest
  } = props
  const creator = contributors[0] || {}
  return (
    <chakra.a as={GatsbyLink} to={url} width="100%">
      <Flex
        transition="all 0.3s"
        direction="column"
        height="100%"
        justify-content="space-between"
        as="article"
        padding="32px"
        borderWidth="1px"
        borderRadius="lg"
        _hover={{ boxShadow: "md" }}
        {...rest}
      >
        <Box flex="1">
          <Heading mb="4" lineHeight="1.4" size="md">
            {title}
          </Heading>
          <Text>{children}</Text>
        </Box>
        <Flex justify="space-between" mt="6" color="gray.500" width="100%">
          <Stack align="center" direction="row" flex="1">
            <Avatar size="sm" name={creator.name} src={creator.image} />
            <Text fontSize="sm">{creator.name}</Text>
          </Stack>
          <Text fontSize="sm">
            <time dateTime={birthTime}>{createdAt}</time>
          </Text>
        </Flex>
      </Flex>
    </chakra.a>
  )
}

function Guides() {
  const { allMdx } = useStaticQuery(graphql`
    query AllGuides {
      allMdx(filter: { fields: { collection: { eq: "guides" } } }) {
        nodes {
          fields {
            slug
            contributors {
              name
              image
            }
          }
          frontmatter {
            title
            description
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
      <Box pt="56px">
        <Box py="80px">
          <Container maxWidth="lg">
            <Heading as="h1" size="xl" mb="3">
              Guides
            </Heading>
            <Text>A list of guides for using Chakra UI with any project.</Text>
          </Container>
        </Box>
        <Container maxWidth="lg">
          <Stack spacing="40px">
            {allMdx.nodes.map(
              ({
                fields: { contributors, slug },
                frontmatter: { title, description },
                parent: { createdAt, birthTime },
              }) => (
                <GuidePreview
                  key={title}
                  url={slug}
                  title={title}
                  birthTime={birthTime}
                  createdAt={createdAt}
                  contributors={contributors}
                >
                  {description}
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
