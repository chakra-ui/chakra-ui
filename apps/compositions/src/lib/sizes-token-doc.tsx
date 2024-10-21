"use client"

import { Box, Flex, For, Stack, Text, defaultSystem } from "@chakra-ui/react"
import { TokenDoc } from "./token-doc"

const { tokens } = defaultSystem

const allSizes = tokens.categoryMap.get("sizes")!.values()
export const defaultSizes = Array.from(allSizes)

const fractionalSizes = defaultSizes.filter((token) => token.name.includes("/"))
const namedSizes = defaultSizes.filter((token) =>
  token.name.match(/v(h|w)|min|max|fit|prose|full/),
)
const breakpointSizes = defaultSizes.filter((token) =>
  token.name.match(/breakpoint/),
)
const largeSizes = defaultSizes.filter(
  (token) =>
    token.name.match(/sm|xl|xs|lg|md/) && !breakpointSizes.includes(token),
)

const tokenSizes = defaultSizes
  .filter(
    (token) =>
      !fractionalSizes.includes(token) &&
      !namedSizes.includes(token) &&
      !breakpointSizes.includes(token) &&
      !largeSizes.includes(token),
  )
  .sort(
    (a, b) =>
      parseInt(a.extensions.pixelValue!) - parseInt(b.extensions.pixelValue!),
  )

export const SizesTokenDoc = () => {
  return (
    <Stack mt="8" gap="8">
      <For
        each={[
          { name: "tokenSizes", tokens: tokenSizes },
          { name: "namedSizes", tokens: namedSizes },
          { name: "fractionalSizes", tokens: fractionalSizes },
          { name: "breakpointSizes", tokens: breakpointSizes },
          { name: "largeSizes", tokens: largeSizes },
        ]}
      >
        {(item) => (
          <TokenDoc title={item.name}>
            <Flex
              fontSize="sm"
              fontWeight="medium"
              py="1"
              px="3"
              borderBottomWidth="1px"
            >
              <Text width="160px">Name</Text>
              <Text width="100px">Value</Text>
              {item.name === "tokenSizes" && <Text width="100px">Pixel</Text>}
            </Flex>

            <Stack px="3" pt="2">
              {item.tokens.map((token) => (
                <Flex key={token.name} py="1" fontSize="sm">
                  <Text width="160px" fontWeight="medium">
                    {token.extensions.prop}
                  </Text>
                  <Text width="100px" color="fg.muted">
                    {token.value}
                  </Text>
                  {item.name === "tokenSizes" && (
                    <Text width="100px" color="fg.muted">
                      {token.extensions.pixelValue}
                    </Text>
                  )}
                  {item.name === "tokenSizes" && (
                    <Box
                      bg="pink.200"
                      height="4"
                      width={`min(${token.originalValue}, 60%)`}
                    />
                  )}
                </Flex>
              ))}
            </Stack>
          </TokenDoc>
        )}
      </For>
    </Stack>
  )
}
