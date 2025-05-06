import { HStack, Status } from "@sh3yk0-ui/react"

export const StatusBasic = () => {
  return (
    <HStack gap="6">
      <Status.Root colorPalette="red">
        <Status.Indicator />
      </Status.Root>
      <Status.Root colorPalette="blue">
        <Status.Indicator />
      </Status.Root>
      <Status.Root colorPalette="orange">
        <Status.Indicator />
      </Status.Root>
      <Status.Root colorPalette="green">
        <Status.Indicator />
      </Status.Root>
    </HStack>
  )
}
