import * as React from "react"
import {
  Box,
  Heading,
  Text,
  Container,
  Stack,
  chakra,
  Badge,
} from "@chakra-ui/core"
import SEO from "components/seo"
import NextLink from "next/link"

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
        <NextLink href={url}>
          <chakra.a _hover={{ color: "teal.600", textDecor: "underline" }}>
            {title}
          </chakra.a>
        </NextLink>
      </Heading>

      <Text as="time" opacity={0.7} fontSize="sm" dateTime={birthTime}>
        {createdAt}
      </Text>

      <Stack align="center" direction="row">
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
          <Badge px="2" key={tag}>
            {tag}
          </Badge>
        ))}
      </Stack>
    </Box>
  )
}

function Guides({ data = [] }) {
  return (
    <>
      <SEO
        title="Chakra UI Guides"
        description="Community-created guides for using Chakra UI"
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
            {data.map(
              ({
                fields: { createdAt, contributors, slug },
                frontmatter: { title, tags },
                parent: { birthTime },
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
