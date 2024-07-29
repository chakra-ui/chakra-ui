import { HStack, Spinner } from "@chakra-ui/react"

export const SpinnerWithSizes = () => {
  return (
    <HStack gap="5">
      <Spinner size="xs" />
      <Spinner size="sm" />
      <Spinner size="md" />
      <Spinner size="lg" />
      <Spinner size="xl" />
    </HStack>
  )
}
