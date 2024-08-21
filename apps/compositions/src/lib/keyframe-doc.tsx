"use client"

import {
  Box,
  Center,
  SimpleGrid,
  Stack,
  Text,
  VStack,
  defaultSystem,
} from "@chakra-ui/react"
import { TokenDoc } from "./token-doc"

const { _config: config, tokens } = defaultSystem

const allKeyframes = Object.keys(config.theme?.keyframes || {}).filter(
  (keyframe) => !keyframe.match(/expand|collapse|bg-|position|circular/),
)

export const KeyframeDoc = () => {
  return (
    <TokenDoc title="theme.keyframes" mt="8">
      <SimpleGrid minChildWidth="160px" gap="20" fontSize="sm">
        {allKeyframes.map((animationName) => {
          return (
            <Stack key={animationName}>
              <Box
                boxSize="12"
                bg="pink.200"
                animation={`${animationName} 1s ease-in-out infinite alternate`}
              />
              <Text fontWeight="medium">{animationName}</Text>
            </Stack>
          )
        })}
      </SimpleGrid>
    </TokenDoc>
  )
}

const allDurations = Array.from(tokens.categoryMap.get("durations")!.entries())
  .sort(
    ([, a], [, b]) => parseFloat(b.originalValue) - parseFloat(a.originalValue),
  )
  .map(([key]) => key)

export const DurationTokenDoc = () => {
  return (
    <TokenDoc title="theme.tokens.durations" mt="8">
      <SimpleGrid minChildWidth="160px" gap="20" fontSize="sm">
        {allDurations.map((durationName) => {
          return (
            <VStack key={durationName}>
              <Center h="20">
                <Box
                  bg="pink.200"
                  height="1"
                  width="20"
                  animationName="spin"
                  animationDuration={durationName}
                  animationTimingFunction="ease-in-out"
                  animationIterationCount="infinite"
                  animationDirection="alternate"
                />
              </Center>
              <Text fontWeight="medium">{durationName}</Text>
            </VStack>
          )
        })}
      </SimpleGrid>
    </TokenDoc>
  )
}
