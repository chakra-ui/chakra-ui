"use client"

import {
  Center,
  Icon,
  SimpleGrid,
  Stack,
  Text,
  type TokenInterface,
  VStack,
  defaultSystem,
} from "@chakra-ui/react"
import { LuCheckCircle } from "react-icons/lu"
import { TokenDoc } from "./token-doc"

const { tokens } = defaultSystem

const colors = tokens.categoryMap.get("colors")!
const allColors = Array.from(colors.values())

const keys = [
  "gray",
  "red",
  "pink",
  "purple",
  "cyan",
  "blue",
  "teal",
  "green",
  "yellow",
  "orange",
  "red",
]

export const ColorTokenDoc = () => {
  return (
    <Stack gap="8" my="8">
      {keys.map((key) => (
        <TokenDoc key={key} title={key}>
          <ColorGrid
            tokens={allColors.filter((token) =>
              token.name.startsWith(`colors.${key}`),
            )}
          />
        </TokenDoc>
      ))}
    </Stack>
  )
}

interface ColorGridItemProps {
  token: TokenInterface
  selected?: boolean
}

const ColorGridItem = (props: ColorGridItemProps) => {
  const { token, selected } = props
  const value = token.extensions.cssVar!.ref
  return (
    <VStack flex="1">
      <Center borderWidth="1px" bg={value} w="full" h="20" rounded="lg">
        {selected && (
          <Icon asChild fontSize="xl" color="white">
            <LuCheckCircle />
          </Icon>
        )}
      </Center>
      <Text textStyle="xs" color="fg.muted">
        {token.name.replace("colors.", "")}
      </Text>
      <pre>{token.originalValue}</pre>
    </VStack>
  )
}

interface ColorGridProps {
  tokens: TokenInterface[]
}

export const ColorGrid = (props: ColorGridProps) => {
  const { tokens } = props
  return (
    <SimpleGrid minChildWidth="80px" gap="2">
      {tokens.map((token) => (
        <ColorGridItem key={token.name} token={token} />
      ))}
    </SimpleGrid>
  )
}
