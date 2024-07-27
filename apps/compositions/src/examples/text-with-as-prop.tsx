import { Code, Stack, Text } from "@chakra-ui/react"

export const TextWithAsProp = () => {
  return (
    <Stack>
      <Text as="p">
        Text rendered as <Code>p</Code> element.
      </Text>
      <Text as="label">
        Text rendered as <Code>label</Code> element.
      </Text>
      <Text as="div">
        Text rendered as <Code>div</Code> element.
      </Text>
      <Text as="span">
        Text rendered as <Code>span</Code> element.
      </Text>
    </Stack>
  )
}
