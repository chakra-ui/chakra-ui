"use client"

import { Box, SimpleGrid, Stack, Text, defaultSystem } from "@chakra-ui/react"
import { TokenDoc } from "./token-doc"

const { tokens } = defaultSystem

const easings = tokens.categoryMap.get("easings")!
const allEasings = Array.from(easings.values())

export const EasingTokenDoc = () => {
  return (
    <TokenDoc title="theme.tokens.easings" mt="8">
      <SimpleGrid columns={2} gap="8" fontSize="sm">
        {allEasings.map((token) => {
          return (
            <Stack key={token.name}>
              <Box
                boxSize="200px"
                bg="pink.200"
                animationName="slide-to-right-full"
                animationTimingFunction={token.value}
                animationDuration="1s"
                animationIterationCount="infinite"
                animationDirection="alternate"
              />
              <Text fontWeight="medium">{token.name}</Text>
            </Stack>
          )
        })}
      </SimpleGrid>
    </TokenDoc>
  )
}
