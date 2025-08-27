import { Checkmark, HStack } from "@chakra-ui/react"

export const CheckmarkIndeterminate = () => {
  return (
    <HStack gap={4}>
      <Checkmark />
      <Checkmark checked />
      <Checkmark indeterminate />
    </HStack>
  )
}
