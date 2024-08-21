"use client"

import { Flex, Stack, Text, defaultSystem } from "@chakra-ui/react"
import { TokenDoc } from "./token-doc"

const { tokens } = defaultSystem

const allZIndex = tokens.categoryMap.get("zIndex")!.values()
export const defaultZIndex = Array.from(allZIndex).sort(
  (a, b) => parseFloat(a.originalValue) - parseFloat(b.originalValue),
)

export const ZIndexTokenDoc = () => {
  return (
    <TokenDoc title="theme.tokens.zIndex" mt="8">
      <Flex
        fontSize="sm"
        fontWeight="medium"
        py="1"
        px="3"
        borderBottomWidth="1px"
      >
        <Text width="100px">Name</Text>
        <Text width="100px">Value</Text>
      </Flex>

      <Stack px="3" pt="2">
        {defaultZIndex.map((token) => (
          <Flex key={token.name} py="1" fontSize="sm">
            <Text width="100px" fontWeight="medium">
              {token.extensions.prop}
            </Text>
            <Text width="100px" color="fg.muted">
              {token.originalValue}
            </Text>
          </Flex>
        ))}
      </Stack>
    </TokenDoc>
  )
}
