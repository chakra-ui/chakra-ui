import {
  Badge,
  Box,
  BoxProps,
  Heading,
  Link,
  Text,
  useColorModeValue,
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
  const badgeColor = useColorModeValue("teal.600", "teal.400")

  return (
    <Box {...rest} maxW="360px">
      <Wrap className="algolia-exclude" spacing="3" mb="2" align="center">
        {tags?.map((tag, index) => (
          <WrapItem key={index}>
            <Badge
              as="a"
              rel="tag"
              color={badgeColor}
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
          <span className="content">{heading}</span>
        </Link>
      </Heading>
      <Text fontSize="sm" color="gray.500" mt="2">
        by {author}
      </Text>
      <Text lineHeight="tall" py={2} opacity={0.8}>
        {description}
      </Text>
    </Box>
  )
}

export default ResourceCard
