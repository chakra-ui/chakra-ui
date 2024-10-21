"use client"

import {
  Center,
  SimpleGrid,
  Stack,
  Text,
  VStack,
  defaultSystem,
} from "@chakra-ui/react"
import { TokenDoc } from "./token-doc"

const { tokens } = defaultSystem

const aspectRatios = tokens.categoryMap.get("aspectRatios")!
const allAspectRatios = Array.from(aspectRatios.values())

export const AspectRatioTokenDoc = () => {
  return (
    <TokenDoc title="theme.tokens.aspectRatios" mt="8">
      <SimpleGrid minChildWidth="160px" gap="8" fontSize="sm">
        {allAspectRatios.map((token) => {
          return (
            <Stack key={token.name} flex="1">
              <Center
                aspectRatio={token.value}
                width="40"
                bg="bg.subtle"
                color="fg.muted"
                borderWidth="1px"
              >
                <VStack gap="0">
                  <Text>{token.extensions.prop}</Text>
                  <Text color="fg.subtle">{token.value}</Text>
                </VStack>
              </Center>
            </Stack>
          )
        })}
      </SimpleGrid>
    </TokenDoc>
  )
}
