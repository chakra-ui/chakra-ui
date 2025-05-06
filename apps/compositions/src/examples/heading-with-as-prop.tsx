import { Heading, Stack } from "@sh3yk0-ui/react"

export const HeadingWithAsProp = () => {
  return (
    <Stack>
      <Heading as="h1">Level 1</Heading>
      <Heading as="h2">Level 2</Heading>
      <Heading as="h3">Level 3</Heading>
    </Stack>
  )
}
