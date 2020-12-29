import {
  Badge,
  Box,
  BoxProps,
  Heading,
  Link,
  Text,
  Wrap,
  WrapItem,
} from "@chakra-ui/react"
import * as React from "react"

export interface Resource {
  heading: string
  type: "blog" | "talk" | "video"
  description: string
  url: string
  author: string
  tags?: string[]
}

interface ResourceCardProps extends BoxProps {
  data: Resource
}

function ResourceCard(props: ResourceCardProps) {
  const { data, ...rest } = props
  const { heading, author, description, url, tags } = data

  return (
    <Box {...rest} maxW="360px">
      <Wrap spacing="3" mb="2" align="center">
        {tags?.map((tag) => (
          <WrapItem>
            <Badge
              as="a"
              rel="tag"
              color="teal.600"
              textTransform="uppercase"
              fontSize="xs"
              fontWeight="bold"
            >
              {tag}
            </Badge>
          </WrapItem>
        ))}
      </Wrap>

      <Heading as="h3" size="sm">
        <Link isExternal href={url}>
          {heading}
        </Link>
      </Heading>
      <Text fontSize="sm" color="gray.500" mt="2">
        by {author}
      </Text>
      <Text lineHeight="tall" py={2} color="gray.600">
        {description}
      </Text>
    </Box>
  )
}

export default ResourceCard
