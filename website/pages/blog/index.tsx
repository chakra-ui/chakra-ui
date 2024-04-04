import {
  Box,
  Button,
  Heading,
  Link,
  Stack,
  StackSeparator,
  Text,
  chakra,
} from '@chakra-ui/react'
import { allBlogs } from 'contentlayer/generated'
import MDXLayout from 'layouts/mdx'
import NextLink from 'next/link'
import { FaArrowRight } from 'react-icons/fa'

const ArrowForwardIcon = chakra(FaArrowRight)

function Blog() {
  return (
    <MDXLayout
      frontmatter={{
        title: 'Blog',
        description: 'Get the latest articles and news from Chakra UI',
        slug: '/blog',
      }}
    >
      <Stack separator={<StackSeparator />} my='12' gap='20'>
        {allBlogs.map((item) => (
          <Box key={item._id}>
            <Link asChild _hover={{ textDecor: 'none' }}>
              <NextLink href={item.slug}>
                <Heading
                  fontWeight='medium'
                  size='lg'
                  _hover={{ color: 'accent' }}
                >
                  {item.title}
                </Heading>
              </NextLink>
            </Link>

            <Text as='time' my='1' color='gray.500' fontSize='sm'>
              {item.frontMatter.publishedDate.text}
            </Text>
            <Text mt='4'>{item.description}</Text>

            <Button
              size='sm'
              asChild
              mt='8'
              variant='outline'
              colorPalette='teal'
            >
              <NextLink href={item.slug}>
                Read more
                <ArrowForwardIcon />
              </NextLink>
            </Button>
          </Box>
        ))}
      </Stack>
    </MDXLayout>
  )
}

export default Blog
