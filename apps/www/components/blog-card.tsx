import { Blog } from "@/.velite"
import { formatBlogDate, getBlogAuthor } from "@/lib/blog"
import { Box, Button, Card, Flex, Stack, Text } from "@chakra-ui/react"
import { Avatar, AvatarGroup } from "compositions/ui/avatar"
import Link from "next/link"

interface Props {
  data: Blog
}

export const BlogCard = (props: Props) => {
  const { data } = props
  const { title, description, authors, publishedAt } = data
  return (
    <Card.Root size="sm">
      <Box h="40" bg="bg.subtle" rounded="md" />
      <Card.Body>
        <Stack gap="1" fontSize="sm">
          <Flex gap="2" justify="space-between">
            <Text fontSize="sm" color="fg.subtle">
              {formatBlogDate(publishedAt)}
            </Text>
            <AvatarGroup size="sm">
              {authors.map((author) => {
                const { name, image } = getBlogAuthor(author)
                return <Avatar key={author} src={image} name={name} />
              })}
            </AvatarGroup>
          </Flex>
          <Card.Title mt="1">
            <Link href={`/${data.slug}`}>{title}</Link>
          </Card.Title>
          <Card.Description>{description}</Card.Description>
          <Button asChild variant="subtle" mt="4" size="sm">
            <Link href={`/${data.slug}`}>Read more</Link>
          </Button>
        </Stack>
      </Card.Body>
    </Card.Root>
  )
}
