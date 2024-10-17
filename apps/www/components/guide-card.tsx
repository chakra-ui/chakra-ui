import { Guides } from "@/.velite"
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
  data: Guides
}

export const GuideCard = (props: Props) => {
  const { data } = props
  const { title, description, publishedAt } = data
  return (
    <Card.Root size="sm">
      <Card.Body p="6">
        <Stack gap="1" fontSize="sm">
          <Card.Title mt="-1">
            <LinkOverlay asChild>
              <Link href={`/${data.slug}`}>{title}</Link>
            </LinkOverlay>
          </Card.Title>
          <Text fontSize="sm" color="fg.subtle">
            {formatBlogDate(publishedAt)}
          </Text>
        </Stack>
      </Card.Body>
    </Card.Root>
  )
}
