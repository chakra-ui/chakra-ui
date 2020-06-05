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
  Link,
} from "@chakra-ui/core"

function GuidePreview(props) {
  const { title, children, createdAt, birthTime, contributors, ...rest } = props
  return (
    <Link as={GatsbyLink}>
      <Flex
        transition="all 0.3s"
        direction="column"
        height="100%"
        justify-content="space-between"
        as="article"
        boxShadow="md"
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
    </Link>
  )
}

function Guides() {
  const { allMdx } = useStaticQuery(graphql`
    query AllGuides {
      allMdx(filter: { fields: { collection: { eq: "guides" } } }) {
        nodes {
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
          <Heading as="h1" size="xl" mb="3">
            Guides
          </Heading>
          <Text>A list of guides for using Chakra UI with any project.</Text>
        </Container>
      </Box>
      <Container maxWidth="lg">
        <SimpleGrid columns={[1, 1, 2]} spacing="24px">
          {allMdx.nodes.map(
            ({
              fields: { contributors },
              frontmatter: { title, description },
              parent: { createdAt, birthTime },
            }) => (
              <GuidePreview
                key={title}
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
