"use client"

import { Box, Center, For, SimpleGrid, VStack } from "@chakra-ui/react"
import { TokenDoc } from "./token-doc"

export const ShadowTokenDoc = () => {
  return (
    <TokenDoc title="theme.semanticTokens.shadows" my="8">
      <SimpleGrid minChildWidth="240px" gap="4">
        <For each={["xs", "sm", "md", "lg", "xl", "2xl"]}>
          {(shadow) => (
            <VStack key={shadow} flex="1">
              <Center
                shadow={shadow}
                width="full"
                height="20"
                bg="bg.muted"
                color="fg.subtleee"
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
