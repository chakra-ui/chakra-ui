import { HStack, Progress } from "@chakra-ui/react"

export const ProgressWithLabel = () => {
  return (
    <Progress.Root defaultValue={40} maxW="240px">
      <HStack justify="space-between" mb="1">
        <Progress.Label>Token usage</Progress.Label>
        <Progress.ValueText />
      </HStack>
      <Progress.Track>
        <Progress.Range />
      </Progress.Track>
    </Progress.Root>
  )
}
