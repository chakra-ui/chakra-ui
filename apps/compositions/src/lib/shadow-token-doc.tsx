"use client"

import { Box, Center, For, SimpleGrid, VStack } from "@chakra-ui/react"
import { TokenDoc } from "./token-doc"

export const ShadowTokenDoc = () => {
  return (
    <TokenDoc title="theme.semanticTokens.shadows" my="8">
      <SimpleGrid minChildWidth="240px" gap="4">
        <For each={["xs", "sm", "md", "lg", "xl", "2xl", "inner", "inset"]}>
          {(shadow) => (
            <VStack key={shadow} flex="1">
              <Center
                shadow={shadow}
                width="full"
                height="20"
                color="fg.muted"
                borderRadius="md"
              />
              <Box>{shadow}</Box>
            </VStack>
          )}
        </For>
      </SimpleGrid>
    </TokenDoc>
  )
}
