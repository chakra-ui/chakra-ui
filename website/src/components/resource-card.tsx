import {
  Badge,
  Box,
  BoxProps,
  Flex,
  Heading,
  Link,
  Text,
} from "@chakra-ui/react"
import { ExternalLinkIcon } from "@chakra-ui/icons"
import * as React from "react"

export interface Resource {
  heading: string
  type: "blog" | "podcast" | "video"
  description: string
  url: string
  author: string
}

interface ResourceCardProps extends BoxProps {
  data: Resource
}

const colorMap = {
  blog: "purple",
  video: "teal",
  podcast: "orange",
}

function ResourceCard(props: ResourceCardProps) {
  const { data, ...rest } = props
  const { heading, author, description, type, url } = data

  return (
    <Box {...rest} maxW="360px">
      <Flex align="baseline">
        <Heading size="md">{heading}</Heading>

        <Badge ml={4} variant="solid" colorScheme={colorMap[type]}>
          {type}
        </Badge>
      </Flex>
      <Text fontSize="sm" as="em">
        by {author}
      </Text>
      <Text lineHeight="tall" py={2}>
        {description}
      </Text>
      <Link color="teal.500" href={url} isExternal>
        View {type}
        <ExternalLinkIcon ml={2} />
      </Link>
    </Box>
  )
}

export default ResourceCard
