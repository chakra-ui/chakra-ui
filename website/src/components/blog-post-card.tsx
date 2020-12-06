import { Box, Heading, LinkBox, Text, VStack } from "@chakra-ui/react"
import format from "date-fns/format"
import parseISO from "date-fns/parseISO"
import _ from "lodash"
import Link from "next/link"
import * as React from "react"
import { BlogPost } from "utils/get-blog-posts"

export type BlogPostCardProps = {
  post: BlogPost
}

export const BlogPostCard: React.FC<BlogPostCardProps> = ({ post }) => {
  const readableDate = format(parseISO(post.date), "MMMM dd, yyyy")

  return (
    <Link href={post.slug} passHref>
      <LinkBox
        as="article"
        href={post.slug}
        tabIndex={0}
        cursor="pointer"
        position="relative"
        borderRadius="md"
        alignItems="flex-start"
        pb="3"
      >
        <Text fontSize="sm" color="gray.500" fontWeight="medium" mb="2">
          {readableDate}
        </Text>
        <VStack align="flex-start" mb="5">
          <Heading as="h3" size="md">
            {post.title}
          </Heading>
          <Box fontSize="sm" color="gray.500" pt="2">
            <Text as="span" mb="3">
              {post.tags.map((t) => _.capitalize(t)).join(",")}
            </Text>
            <Box
              bg="gray.100"
              fontWeight="semibold"
              px="2"
              py="1"
              ml="5"
              as="span"
              rounded="base"
            >
              {post.readTimeMinutes} min read
            </Box>
          </Box>
        </VStack>
        <Text _after={{ content: '"\\02026"' }}>{post.excerpt}</Text>
      </LinkBox>
    </Link>
  )
}
