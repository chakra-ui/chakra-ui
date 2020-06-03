import React from "react"
import { useStaticQuery, graphql, Link as GatsbyLink } from "gatsby"
import { Box, Image, Text, SimpleGrid, Link } from "@chakra-ui/core"

function useQuery() {
  return useStaticQuery(graphql`
    query {
      allFile {
        nodes {
          publicURL
          relativePath
        }
      }
      allMdx(filter: { fields: { collection: { eq: "components" } } }) {
        nodes {
          frontmatter {
            image
            description
            title
          }
          fields {
            slug
          }
        }
      }
    }
  `)
}

function ComponentCard(props) {
  const { title, image, url, ...rest } = props

  return (
    <Link
      as={GatsbyLink}
      to={url}
      borderWidth="1px"
      transition="all 0.2s"
      borderRadius="lg"
      overflow="hidden"
      _hover={{ boxShadow: "md", cursor: "pointer" }}
      {...rest}
    >
      <Image
        fit="cover"
        h="160px"
        w="100%"
        alt={title}
        src={image && image.publicURL}
      />
      <Box padding="5">
        <Text fontWeight="semibold">{title}</Text>
      </Box>
    </Link>
  )
}

function getSrc(images, url) {
  const result = images.find((node) => node.relativePath === url)
  return result
}

export function ComponentList() {
  const query = useQuery()
  const components = query.allMdx.nodes
    .filter(
      (item) => !item.frontmatter.title.toLowerCase().includes("overview"),
    )
    .sort(function (a, b) {
      if (a.frontmatter.title < b.frontmatter.title) {
        return -1
      }
      if (a.frontmatter.title > b.frontmatter.title) {
        return 1
      }
      return 0
    })

  const images = query.allFile.nodes

  return (
    <SimpleGrid mt="40px" spacing="6" columns={[1, 3]}>
      {components.map(({ frontmatter, fields }) => (
        <ComponentCard
          url={fields.slug}
          key={frontmatter.title}
          title={frontmatter.title}
          description={frontmatter.description}
          image={getSrc(images, frontmatter.image)}
        />
      ))}
    </SimpleGrid>
  )
}
