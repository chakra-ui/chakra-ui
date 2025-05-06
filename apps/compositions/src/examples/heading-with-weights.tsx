import { Heading, Stack } from "@sh3yk0-ui/react"

export const HeadingWithWeights = () => {
  return (
    <Stack>
      <Heading fontWeight="normal">Normal</Heading>
      <Heading fontWeight="medium">Medium</Heading>
      <Heading fontWeight="semibold">Semibold</Heading>
      <Heading fontWeight="bold">Bold</Heading>
    </Stack>
  )
}
