"use client"

import {
  Box,
  For,
  SimpleGrid,
  Square,
  Stack,
  defaultSystem,
} from "@chakra-ui/react"
import { TokenDoc } from "./token-doc"

const { tokens, _config } = defaultSystem
const keys = Object.keys(_config.theme?.tokens?.radii ?? {})

export const BorderRadiusTokenDoc = () => {
  return (
    <TokenDoc title="theme.tokens.radii" mt="8">
      <SimpleGrid minChildWidth="120px" gap="4">
        <For each={keys}>
          {(radius) => {
            const token = tokens.getByName(`radii.${radius}`)
            return (
              <Stack key={radius} flex="1">
                <Square
                  borderRadius={radius}
                  size="20"
                  bg="bg.subtle"
                  color="fg.muted"
                  borderWidth="1px"
                />
                <Box lineHeight="1">{radius}</Box>
                <Box as="pre" color="fg.subtle" fontSize="xs">
                  {token?.originalValue}
                </Box>
              </Stack>
            )
          }}
        </For>
      </SimpleGrid>
    </TokenDoc>
  )
}
