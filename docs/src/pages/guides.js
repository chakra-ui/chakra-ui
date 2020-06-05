import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"
import {
  Box,
  Heading,
  Text,
  Container,
  Stack,
  Flex,
  Avatar,
  SimpleGrid,
} from "@chakra-ui/core"

function GuidePreview(props) {
  const { title, children, createdAt, birthTime, contributors, ...rest } = props
  return (
    <Flex
      transition="all 0.3s"
      _hover={{ boxShadow: "md", cursor: "pointer" }}
      direction="column"
      justify-content="space-between"
      as="article"
      padding="24px"
      borderWidth="1px"
      borderRadius="lg"
      {...rest}
    >
      <Box flex="1">
        <Heading
          mb="2"
          lineHeight="1.4"
          size="md"
          as="h3"
          fontWeight="semibold"
        >
          {title}
        </Heading>
        <Text>{children}</Text>
      </Box>
      <Flex justify="space-between" mt="6" color="gray.500" width="100%">
        <Stack direction="row" flex="1">
          <Avatar size="xs" />
          <Text fontSize="sm">dsfdfsdd</Text>
        </Stack>
        <Text fontSize="sm">
          <span>Created at: </span>
          <time dateTime={birthTime}>{createdAt}</time>
        </Text>
      </Flex>
    </Flex>
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
