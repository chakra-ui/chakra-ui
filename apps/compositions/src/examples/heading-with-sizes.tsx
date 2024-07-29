import { Heading, Stack } from "@chakra-ui/react"

export const HeadingWithSizes = () => {
  return (
    <Stack gap="2" align="flex-start">
      <Heading size="sm">Heading (sm)</Heading>
      <Heading size="md">Heading (md)</Heading>
      <Heading size="lg">Heading (lg)</Heading>
      <Heading size="xl">Heading (xl)</Heading>
      <Heading size="2xl">Heading (2xl)</Heading>
      <Heading size="3xl">Heading (3xl)</Heading>
      <Heading size="4xl">Heading (4xl)</Heading>
      <Heading size="5xl">Heading (5xl)</Heading>
      <Heading size="6xl">Heading (6xl)</Heading>
    </Stack>
  )
}
