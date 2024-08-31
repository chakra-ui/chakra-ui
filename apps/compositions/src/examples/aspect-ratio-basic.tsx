import { AspectRatio, Center } from "@chakra-ui/react"

export const AspectRatioBasic = () => {
  return (
    <AspectRatio bg="bg.subtle" ratio={2 / 1}>
      <Center fontSize="xl">2 / 1</Center>
    </AspectRatio>
  )
}
