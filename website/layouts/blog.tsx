import { Avatar, Box, HStack, Text } from '@chakra-ui/react'
import MDXLayout from './mdx'

interface BlogLayoutProps {
  frontmatter: any
  children: React.ReactNode
}

export default function BlogLayout(props: BlogLayoutProps) {
  const { frontmatter, children } = props

  if (!frontmatter) return <></>
  const { publishedDate = {}, authorData: data = {} } = frontmatter

  return (
    <MDXLayout frontmatter={frontmatter}>
      <HStack mt='8' mb='4'>
        <Avatar.Root size='md' src={data.avatar_url}>
          <Avatar.Image />
          <Avatar.Fallback />
        </Avatar.Root>
        <Box>
          <Text fontWeight='bold' fontSize='sm'>
            {data.name}
          </Text>
          <Text fontSize='xs'>
            <a href={data.url}>{data.login}</a>
          </Text>
        </Box>
      </HStack>
      <Box
        as='time'
        dateTime={publishedDate.iso}
        color='gray.500'
        fontSize='sm'
        display='block'
        mb='16'
      >
        {publishedDate.text}
      </Box>

      {children}
    </MDXLayout>
  )
}
