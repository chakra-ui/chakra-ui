import { Code, Stack } from "@sh3yk0-ui/react"

export const CodeWithVariants = () => {
  return (
    <Stack gap="2" align="flex-start">
      <Code variant="solid">console.log()</Code>
      <Code variant="outline">console.log()</Code>
      <Code variant="subtle">console.log()</Code>
      <Code variant="surface">console.log()</Code>
    </Stack>
  )
}
