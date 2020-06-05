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
  SimpleGrid,
  chakra,
} from "@chakra-ui/core"

function GuidePreview(props) {
  const { title, children, createdAt, birthTime, url, ...rest } = props
  return (
    <chakra.a as={GatsbyLink} to={url}>
      <Flex
        transition="all 0.3s"
        direction="column"
        height="100%"
        borderWidth="1px"
        justify-content="space-between"
        as="article"
        boxShadow="sm"
        _hover={{ boxShadow: "lg" }}
        borderRadius="lg"
        overflow="hidden"
        padding="3rem"
        {...rest}
      >
        <Box flex="1">
          <Heading mb="24px" lineHeight="1.4" size="md" as="h2">
            {title}
          </Heading>
          <Text>{children}</Text>
        </Box>
        <Flex justify="space-between" mt="6" color="gray.500" width="100%">
          <Stack align="center" direction="row" flex="1">
            <Avatar size="sm" />
            <Text fontSize="sm">Segun Adebayo</Text>
          </Stack>
          <Text fontSize="sm">
            <span>Created at: </span>
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
    <Box pt="56px">
      <Box py="80px">
        <Container maxWidth="lg">
          <Heading as="h1" size="2xl" mb="3">
            Guides
          </Heading>
          <Text>A list of guides for using Chakra UI with any project.</Text>
        </Container>
      </Box>
      <Container maxWidth="lg">
        <SimpleGrid columns={[1, 1, 2]} spacing="24px">
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
        </SimpleGrid>
      </Container>
    </Box>
  )
}

export default Guides
