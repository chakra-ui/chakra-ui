import { HStack, Status } from "@chakra-ui/react"

export const StatusWithLabel = () => {
  return (
    <HStack gap="6">
      <Status.Root colorPalette="red">
        <Status.Indicator />
        Error
      </Status.Root>
      <Status.Root colorPalette="blue">
        <Status.Indicator />
        Info
      </Status.Root>
      <Status.Root colorPalette="orange">
        <Status.Indicator />
        Warning
      </Status.Root>
      <Status.Root colorPalette="green">
        <Status.Indicator />
        Success
      </Status.Root>
    </HStack>
  )
}
