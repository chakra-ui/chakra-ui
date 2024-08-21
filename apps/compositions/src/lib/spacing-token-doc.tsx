"use client"

import { Box, Flex, Stack, Text, defaultSystem } from "@chakra-ui/react"
import { TokenDoc } from "./token-doc"

const { tokens } = defaultSystem

const allSpacing = tokens.categoryMap.get("spacing")!.values()
export const defaultSpacings = Array.from(allSpacing)
  .filter(
    (token) =>
      token.extensions.category === "spacing" && !token.extensions.negative,
  )
  .sort((a, b) => parseFloat(a.value) - parseFloat(b.value))

export const SpacingTokenDoc = () => {
  return (
    <TokenDoc title="theme.tokens.spacing" mt="8">
      <Flex
        fontSize="sm"
        fontWeight="medium"
        py="1"
        px="3"
        borderBottomWidth="1px"
      >
        <Text width="100px">Name</Text>
        <Text width="100px">Value</Text>
        <Text width="100px">Pixel</Text>
      </Flex>

      <Stack px="3" pt="2">
        {defaultSpacings.map((token) => (
          <Flex key={token.name} py="1" fontSize="sm">
            <Text width="100px" fontWeight="medium">
              {token.extensions.prop}
            </Text>
            <Text width="100px" color="fg.muted">
              {token.value}
            </Text>
            <Text width="100px" color="fg.muted">
              {token.extensions.pixelValue}
            </Text>
            <Box flex="1">
              <Box
                bg="pink.200"
                height="4"
                width={token.extensions.cssVar!.ref}
              />
            </Box>
          </Flex>
        ))}
      </Stack>
    </TokenDoc>
  )
}
