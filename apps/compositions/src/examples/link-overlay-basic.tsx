import { Heading, Link, LinkOverlay, Stack, Text } from "@chakra-ui/react"

export const LinkOverlayBasic = () => {
  return (
    <Stack position="relative">
      <Heading as="h4">Wanna try it out?</Heading>
      <Text color="fg.muted">
        This entire area is a link. Click it to see the effect.
      </Text>
      <LinkOverlay asChild href="#">
        <Link variant="underline">Click me</Link>
      </LinkOverlay>
    </Stack>
  )
}
