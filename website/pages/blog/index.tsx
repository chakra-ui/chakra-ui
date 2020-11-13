import * as React from "react"
import SEO from "components/seo"
import Header from "components/header"
import { Box, Heading, Stack } from "@chakra-ui/react"
import { SkipNavContent, SkipNavLink } from "@chakra-ui/skip-nav"
import { BlogPostCard } from "components/blog-post-card"
import { getBlogPosts } from "utils/get-blog-posts"

type ThenArg<T> = T extends PromiseLike<infer U> ? U : T
type StaticProps = ThenArg<ReturnType<typeof getStaticProps>>["props"]

export type BlogIndexProps = StaticProps

const BlogIndex: React.FC<BlogIndexProps> = ({ posts }) => {
  return (
    <>
      <SEO
        title="Chakra UI Blog"
        description="Sharing latest news about Chakra UI"
      />
      <SkipNavLink zIndex={20}>Skip to Content</SkipNavLink>
      <Header />
      <Box as="main" mt="120px" mb="60px">
        <SkipNavContent />
        <Box
          w="full"
          px="1rem"
          py="80px"
          pb="12"
          pt="3"
          mx="auto"
          maxW="1280px"
        >
          <Heading as="h1" size="xl" mb="5">
            Chakra UI Blog
          </Heading>
          <Stack
            mt="10"
            spacing="6"
            align="stretch"
            direction={{ base: "column" }}
          >
            {posts.map((post) => (
              <BlogPostCard key={post.slug} post={post} />
            ))}
          </Stack>
        </Box>
      </Box>
    </>
  )
}

export async function getStaticProps() {
  const posts = await getBlogPosts()
  return {
    props: {
      posts,
    },
  }
}

export default BlogIndex
