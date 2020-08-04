import {
  Badge,
  Box,
  chakra,
  Container,
  Heading,
  Stack,
  Text,
} from "@chakra-ui/core"
import { createExcerpt, parseMarkdownFile } from "@docusaurus/utils"
import SEO from "components/seo"
import siteConfig from "configs/site-config"
import NextLink from "next/link"
import path from "path"
import * as React from "react"
import shell from "shelljs"

function GuidePreview({ guide }) {
  const { title, children, createdAt, url, tags, ...rest } = guide

  return (
    <Box as="article" {...rest}>
      <Heading mb="3" color="teal.500" lineHeight="1.4" size="md">
        <NextLink href={url}>
          <chakra.a _hover={{ color: "teal.600", textDecor: "underline" }}>
            {title}
          </chakra.a>
        </NextLink>
      </Heading>

      <Text as="time" opacity={0.7} fontSize="sm">
        {createdAt}
      </Text>

      <Stack align="center" direction="row">
        {/* <Avatar size="sm" name={creator?.name} src={creator?.image} /> */}
        <Text fontSize="sm" fontWeight="semibold">
          {/* <chakra.a
            href={creator?.url}
            target="__blank"
            _hover={{ textDecor: "underline" }}
          >
            {creator?.name}
          </chakra.a> */}
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
            {/* {data.map((guide, idx) => (
              <GuidePreview key={idx} guide={guide} />
            ))} */}
          </Stack>
        </Container>
      </Box>
    </>
  )
}

export async function getStaticProps() {
  const { processFrontmatter } = require("utils/mdx-utils")

  const dir = path.join(process.cwd(), "pages/guides")
  const filenames = shell.ls("-R", `${dir}/**/*.mdx`)

  const dataPromise = filenames.map(async (filename) => {
    // get the `pages` directory
    const pagesDir = path.join(process.cwd(), "pages")

    // gets the relative mdx path
    // pages/docs/guides.mdx => /docs/guides.mdx
    const mdxPath = path.relative(pagesDir, filename)

    // extract frontmatter and content from markdown string
    const { frontMatter, content } = await parseMarkdownFile(filename)

    // extends frontmatter with more useful information
    const _frontmatter = await processFrontmatter({
      ...frontMatter,
      path: mdxPath,
      baseEditUrl: siteConfig.repo.editUrl,
      excerpt: createExcerpt(content),
    })

    return _frontmatter
  })

  const data = await Promise.all(dataPromise)

  return {
    props: {
      data,
    },
  }
}

export default Guides
