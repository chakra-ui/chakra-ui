"use client"

import { Box, For, Stack, Text, defaultSystem } from "@chakra-ui/react"
import { TokenDoc } from "./token-doc"

const { tokens, _config } = defaultSystem
const keys = Object.keys(_config.theme?.tokens?.fonts ?? {})

export const FontTokenDoc = () => {
  return (
    <TokenDoc title="fonts" mt="8">
      <Stack gap="8">
        <For each={keys}>
          {(font) => {
            const token = tokens.getByName(`fonts.${font}`)
            return (
              <Stack key={font} flex="1">
                <Text fontSize="3xl" fontWeight="medium" fontFamily={font}>
                  Ag
                </Text>
                <Box>{font}</Box>
                <Box
                  as="pre"
                  whiteSpace="balance"
                  color="fg.muted"
                  fontSize="xs"
                >
                  {token?.originalValue}
                </Box>
              </Stack>
            )
          }}
        </For>
      </Stack>
    </TokenDoc>
  )
}
