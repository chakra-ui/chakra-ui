import { Box, Circle, Float, HStack, Stack } from "@chakra-ui/react"

export const FloatWithPlacements = () => (
  <HStack gap="14" wrap="wrap">
    {placements.map((placement) => (
      <Stack key={placement} gap="3">
        <p>{placement}</p>
        <Box position="relative" width="80px" height="80px" bg="bg.emphasized">
          <Float placement={placement}>
            <Circle size="5" bg="red" color="white">
              3
            </Circle>
          </Float>
        </Box>
      </Stack>
    ))}
  </HStack>
)

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
