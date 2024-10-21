import { Center, For, HStack, Stack, Text } from "@chakra-ui/react"

const items = [
  ["Fill", ["fill.muted", "fill.subtle", "fill.surface", "fill.solid"]],
  ["Outline", ["outline.subtle", "outline.solid"]],
  [
    "Indicator",
    ["indicator.top", "indicator.bottom", "indicator.start", "indicator.end"],
  ],
] as const

export const TokensLayerStyle = () => {
  return (
    <Stack gap="20" mt="10" mb="20">
      <For each={items}>
        {([title, styles]) => (
          <Stack gap="4">
            <Text fontWeight="medium" color="fg.muted">
              layerStyle: {title.toLowerCase()}.*
            </Text>
            <HStack wrap="wrap" gap="10">
              <For each={styles}>
                {(layerStyle) => (
                  <Center
                    colorPalette="teal"
                    key={layerStyle}
                    layerStyle={layerStyle}
                    height="10"
                    flex="1"
                    fontWeight="medium"
                  >
                    {layerStyle}
                  </Center>
                )}
              </For>
            </HStack>
          </Stack>
        )}
      </For>
    </Stack>
  )
}
