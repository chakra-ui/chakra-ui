import {
  Heading,
  Link,
  LinkBox,
  LinkOverlay,
  Span,
  Text,
} from "@chakra-ui/react"

export const LinkOverlayArticle = () => {
  return (
    <LinkBox as="article" maxW="sm" p="5" borderWidth="1px" rounded="md">
      <Span asChild color="fg.muted" textStyle="sm">
        <time dateTime="2021-01-15 15:30:00 +0000 UTC">13 days ago</time>
      </Span>
      <Heading size="lg" my="2">
        <LinkOverlay href="#">Chakra V3 Workshop</LinkOverlay>
      </Heading>
      <Text mb="3" color="fg.muted">
        Catch up on whats been cooking at Chakra UI and explore some of the
        popular community resources.
      </Text>
      <Link href="#inner-link" variant="underline" colorPalette="teal">
        Inner Link
      </Link>
    </LinkBox>
  )
}
