import { HStack, Progress } from "@chakra-ui/react"

export const ProgressWithInlineLabel = () => {
  return (
    <Progress.Root defaultValue={40} maxW="sm">
      <HStack gap="5">
        <Progress.Label>Usage</Progress.Label>
        <Progress.Track flex="1">
          <Progress.Range />
        </Progress.Track>
        <Progress.ValueText>40%</Progress.ValueText>
      </HStack>
    </Progress.Root>
  )
}
