import { Blog } from "@/.velite"
import { formatBlogDate, getBlogAuthor } from "@/lib/blog"
import {
  Badge,
  Box,
  Button,
  Card,
  Center,
  Flex,
  LinkOverlay,
  Stack,
  Text,
} from "@chakra-ui/react"
import { Avatar, AvatarGroup } from "compositions/ui/avatar"
import Link from "next/link"
import { Logo, LogoIcon } from "./logo"

interface Props {
  data: Blog
}

export const BlogCard = (props: Props) => {
  const { data } = props
  const { title, description, authors, publishedAt } = data
  return (
    <Card.Root size="sm">
      <Box h="40" bg="teal.subtle/50" roundedTop="md">
        {data.version ? (
          <Center h="full" gap="2">
            <Logo />{" "}
            <Badge size="lg" variant="solid" colorPalette="teal">
              v{data.version}
            </Badge>
          </Center>
        ) : (
          <Center h="full">
            <LogoIcon />
          </Center>
        )}
      </Box>
      <Card.Body>
        <Stack gap="1" fontSize="sm">
          <Flex gap="2" justify="space-between">
            <Text textStyle="sm" color="fg.muted">
              {formatBlogDate(publishedAt)}
            </Text>
            <AvatarGroup size="xs">
              {authors.map((author) => {
                const { name, image } = getBlogAuthor(author)
                return <Avatar key={author} src={image} name={name} />
              })}
            </AvatarGroup>
          </Flex>
          <Card.Title mt="-2" textStyle="lg">
            <LinkOverlay asChild>
              <Link href={`/${data.slug}`}>{title}</Link>
            </LinkOverlay>
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
