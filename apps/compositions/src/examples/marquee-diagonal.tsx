"use client"
import { Box, Marquee, Text } from "@chakra-ui/react"

export const MarqueeDiagonal = () => {
  return (
    <Box
      position="relative"
      top="25%"
      overflow="hidden"
      transform="rotate(-2deg)"
      bg="yellow.400"
      py="4"
    >
      <Marquee.Root style={{ "--marquee-duration": "40s" } as any}>
        <Marquee.Viewport>
          <Marquee.Content>
            {[...Array(10)].map((_, i) => (
              <Marquee.Item key={i} padding="0 3rem">
                <Text
                  color="black"
                  fontSize="3xl"
                  fontWeight="bold"
                  textTransform="uppercase"
                >
                  Kigali Convention Conference 2026 •
                </Text>
              </Marquee.Item>
            ))}
          </Marquee.Content>
        </Marquee.Viewport>
      </Marquee.Root>
    </Box>
  )
}
