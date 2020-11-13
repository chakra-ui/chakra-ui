import * as React from "react"
import {
  Box,
  Heading,
  HStack,
  Tag,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react"
import format from "date-fns/format"
import parseISO from "date-fns/parseISO"
import Link from "next/link"
import { BlogPost } from "utils/get-blog-posts"

// TODO replace with `breakout` prop
// see https://github.com/chakra-ui/chakra-ui/pull/1717
const breakoutLinkStyle = {
  position: "static",
  "&::before": {
    content: "''",
    cursor: "inherit",
    display: "block",
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
  },
}

export type BlogPostCardProps = {
  post: BlogPost
}

export const BlogPostCard: React.FC<BlogPostCardProps> = ({ post }) => {
  const secondaryColor = useColorModeValue("blackAlpha.600", "whiteAlpha.600")
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.200")

  const readableDate = format(parseISO(post.date), "MMMM dd, yyyy")

  return (
    <VStack
      as="article"
      position="relative"
      p={4}
      border="1px"
      borderColor={borderColor}
      borderRadius="md"
      alignItems="flex-start"
    >
      <header>
        <Heading as="h2" size="md">
          <Link href={post.slug}>
            <Box as="a" __css={breakoutLinkStyle} tabIndex={0} cursor="pointer">
              {post.title}
            </Box>
          </Link>
        </Heading>
        <Box as="aside" fontSize="xs">
          <Text as="span" color={secondaryColor}>
            {readableDate}
          </Text>
          <Text as="span" color={secondaryColor} px={1} role="none">
            |
          </Text>
          <Text as="span" color={secondaryColor}>
            {post.readTimeMinutes} min read
          </Text>
        </Box>
      </header>
      <Text>{post.excerpt}</Text>
      <footer>
        <HStack as="ul" flexWrap="wrap">
          {post.tags.map((tag) => (
            <Tag as="li" key={tag} size="sm">
              {tag}
            </Tag>
          ))}
        </HStack>
      </footer>
    </VStack>
  )
}
