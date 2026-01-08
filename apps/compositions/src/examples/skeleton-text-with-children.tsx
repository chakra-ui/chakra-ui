import { SkeletonText, Stack, Text } from "@chakra-ui/react"

export const SkeletonTextWithChildren = () => {
  return (
    <Stack gap="4">
      <Text fontWeight="medium">loading is true:</Text>
      <SkeletonText noOfLines={5}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin nec nisi
        ultrices, rutrum lacus quis, cursus nisi.
      </SkeletonText>

      <Text fontWeight="medium">loading is false:</Text>
      <SkeletonText noOfLines={5} loading={false}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin nec nisi
        ultrices, rutrum lacus quis, cursus nisi.
      </SkeletonText>
    </Stack>
  )
}
