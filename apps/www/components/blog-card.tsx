import { Blog } from "@/.velite"
import { formatBlogDate, getBlogAuthor } from "@/lib/blog"
import {
  Avatar,
  AvatarGroup,
  Badge,
  Card,
  Flex,
  HStack,
  LinkOverlay,
  Text,
} from "@chakra-ui/react"
import Link from "next/link"

interface Props {
  data: Blog
}

export const BlogCard = (props: Props) => {
  const { data } = props
  const { title, description, authors, publishedAt } = data
  return (
    <Card.Root size="sm">
      <Card.Body gap="2">
        <Flex gap="2" justify="space-between">
          <Text textStyle="sm" color="fg.muted">
            {formatBlogDate(publishedAt)}
          </Text>
          <AvatarGroup size="2xs" spaceX="-2">
            {authors.map((author) => {
              const { name, image } = getBlogAuthor(author)
              return (
                <Avatar.Root key={author} boxSizing="content-box">
                  <Avatar.Image src={image} />
                  <Avatar.Fallback name={name} />
                </Avatar.Root>
              )
            })}
          </AvatarGroup>
        </Flex>
        <Card.Title textStyle="lg">
          <LinkOverlay asChild>
            <Link href={`/${data.slug}`}>{title}</Link>
          </LinkOverlay>
        </Card.Title>
        <Card.Description minH="2lh" mb="2">
          {description}
        </Card.Description>
        <HStack colorPalette="teal" gap="1">
          <Badge size="sm">{data.type}</Badge>
          {data.version && <Badge size="sm">v{data.version}</Badge>}
        </HStack>
      </Card.Body>
    </Card.Root>
  )
}
