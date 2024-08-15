import { Heading, Highlight, Stack, Text } from "@chakra-ui/react"

export const HeadingWithHighlight = () => {
  return (
    <Stack>
      <Heading size="3xl" letterSpacing="tight">
        <Highlight query="with speed" styles={{ color: "teal.600" }}>
          Create accessible React apps with speed
        </Highlight>
      </Heading>
      <Text fontSize="md" color="fg.muted">
        Chakra UI is a simple, modular and accessible component library that
        gives you the building blocks you need.
      </Text>
    </Stack>
  )
}
