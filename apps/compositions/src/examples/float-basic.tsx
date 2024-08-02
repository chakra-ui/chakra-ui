"use client"

import { Box, Circle, Float, Stack } from "@chakra-ui/react"

const placements = [
  "bottom-end",
  "bottom-start",
  "top-end",
  "top-start",
  "bottom-center",
  "top-center",
  "middle-center",
  "middle-end",
  "middle-start",
] as const

export const FloatBasic = () => (
  <Stack gap="10">
    {placements.map((placement) => (
      <Stack key={placement} gap="3">
        <p>{placement}</p>
        <Box position="relative" width="80px" height="80px" bg="gray.500">
          <Float placement={placement}>
            <Circle size="5" bg="red.500">
              3
            </Circle>
          </Float>
        </Box>
      </Stack>
    ))}
  </Stack>
)
