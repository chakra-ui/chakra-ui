import * as React from "react"
import {
  Box,
  Heading,
  HStack,
  LinkBox,
  Tag,
  Text,
  useColorModeValue,
} from "@chakra-ui/react"
import format from "date-fns/format"
import parseISO from "date-fns/parseISO"
import Link from "next/link"
import { BlogPost } from "utils/get-blog-posts"

export type BlogPostCardProps = {
  post: BlogPost
}

export const BlogPostCard: React.FC<BlogPostCardProps> = ({ post }) => {
  const secondaryColor = useColorModeValue("blackAlpha.600", "whiteAlpha.600")
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.200")

  const readableDate = format(parseISO(post.date), "MMMM dd, yyyy")

  return (
    <Link href={post.slug} passHref>
      <LinkBox
        href={post.slug}
        breakout
        tabIndex={0}
        cursor="pointer"
        position="relative"
        p={4}
        border="1px"
        borderColor={borderColor}
        borderRadius="md"
        alignItems="flex-start"
      >
        <header>
          <Heading as="h2" size="md">
            {post.title}
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
      </LinkBox>
    </Link>
  )
}
