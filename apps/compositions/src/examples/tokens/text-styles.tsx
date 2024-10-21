import { For, Stack, Text } from "@chakra-ui/react"

export const TokensTextStyles = () => {
  return (
    <Stack gap="8">
      <For
        each={[
          "xs",
          "sm",
          "md",
          "lg",
          "xl",
          "2xl",
          "3xl",
          "4xl",
          "5xl",
          "6xl",
          "7xl",
        ]}
      >
        {(textStyle) => (
          <Stack>
            <Text textStyle="sm" fontWeight="medium" color="fg.muted">
              textStyle: {textStyle}
            </Text>
            <Text textStyle={textStyle}>Chakra UI</Text>
          </Stack>
        )}
      </For>
    </Stack>
  )
}
