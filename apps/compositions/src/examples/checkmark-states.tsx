import { Checkmark, HStack } from "@chakra-ui/react"

export const CheckmarkStates = () => {
  return (
    <HStack gap={3}>
      <Checkmark />
      <Checkmark checked />
      <Checkmark indeterminate />
      <Checkmark disabled />
      <Checkmark checked disabled />
      <Checkmark indeterminate disabled />
    </HStack>
  )
}
