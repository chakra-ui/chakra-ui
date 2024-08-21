"use client"

import { Box, For, HStack, Stack, Text, defaultSystem } from "@chakra-ui/react"
import { TokenDoc } from "./token-doc"

const { tokens, _config } = defaultSystem

const fonts = Object.keys(_config.theme?.tokens?.fonts ?? {})
const fontSizes = Object.keys(_config.theme?.tokens?.fontSizes ?? {})
const fontWeights = Object.keys(_config.theme?.tokens?.fontWeights ?? {})
const lineHeights = Object.keys(_config.theme?.tokens?.lineHeights ?? {})
const letterSpacings = Object.keys(_config.theme?.tokens?.letterSpacings ?? {})

export const FontTokenDoc = () => {
  return (
    <TokenDoc title="theme.tokens.fonts" mt="8">
      <Stack gap="8">
        <For each={fonts}>
          {(font) => {
            const token = tokens.getByName(`fonts.${font}`)
            return (
              <Stack key={font} flex="1">
                <Text fontSize="3xl" fontFamily={font}>
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

export const FontSizeTokenDoc = () => {
  return (
    <TokenDoc title="theme.tokens.fontSizes" mt="8">
      <Stack gap="4">
        {fontSizes.map((fontSize) => {
          const token = tokens.getByName(`fontSizes.${fontSize}`)!
          return (
            <Stack key={fontSize} direction="row" align="center">
              <Text width="4rem">{token.extensions.prop}</Text>
              <Text width="6rem" color="fg.muted">
                {token.value}
              </Text>
              <Text fontSize={token.value}>Ag</Text>
            </Stack>
          )
        })}
      </Stack>
    </TokenDoc>
  )
}

export const FontWeightTokenDoc = () => {
  return (
    <TokenDoc title="theme.tokens.fontWeights" mt="8">
      <Stack gap="4">
        {fontWeights.map((fontWeight) => {
          const token = tokens.getByName(`fontWeights.${fontWeight}`)!
          return (
            <Stack key={fontWeight} direction="row" align="center">
              <Text width="6rem">{token.extensions.prop}</Text>
              <Text width="6rem" color="fg.muted">
                {token.value}
              </Text>
              <Text fontWeight={token.value} fontSize="2xl">
                Ag
              </Text>
            </Stack>
          )
        })}
      </Stack>
    </TokenDoc>
  )
}

export const LineHeightTokenDoc = () => {
  return (
    <TokenDoc title="theme.tokens.lineHeights" mt="8">
      <Stack gap="8">
        {lineHeights.map((lineHeight) => {
          const token = tokens.getByName(`lineHeights.${lineHeight}`)!
          return (
            <Stack key={lineHeight}>
              <HStack color="fg.muted">
                <Text>
                  {token.extensions.prop} / {token.value}
                </Text>
              </HStack>
              <Text fontSize="2xl" lineHeight={token.value}>
                Naruto is a Japanese manga series written and illustrated by
                Masashi Kishimoto. It tells the story of Naruto Uzumaki, a young
                ninja who seeks recognition from his peers and dreams of
                becoming the Hokage, the leader of his village.
              </Text>
            </Stack>
          )
        })}
      </Stack>
    </TokenDoc>
  )
}

export const LetterSpacingTokenDoc = () => {
  return (
    <TokenDoc title="theme.tokens.letterSpacings" mt="8">
      <Stack gap="4">
        {letterSpacings.map((letterSpacing) => {
          const token = tokens.getByName(`letterSpacings.${letterSpacing}`)!
          return (
            <Stack key={letterSpacing}>
              <Text color="fg.muted">
                {token.extensions.prop} / {token.value}
              </Text>
              <Text fontSize="2xl" letterSpacing={token.value}>
                Naruto Uzumaki
              </Text>
            </Stack>
          )
        })}
      </Stack>
    </TokenDoc>
  )
}
