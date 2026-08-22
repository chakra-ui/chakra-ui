"use client"

import { Box, Circle, Flex, HStack, Marquee } from "@chakra-ui/react"

const newsItems = [
  "Bitcoin hits all-time high",
  "New React version released",
  "SpaceX successfully lands rocket",
  "Global markets rally today",
  "AI regulation talks begin in EU",
]

export const MarqueeNewsTicker = () => {
  return (
    <Flex align="center" bg="bg.muted">
      <Box
        bg="teal.solid"
        color="teal.contrast"
        px="4"
        py="2"
        whiteSpace="nowrap"
        textStyle="sm"
        fontWeight="medium"
      >
        LATEST NEWS
      </Box>

      <Marquee.Root css={{ "--marquee-duration": "40s" }}>
        <Marquee.Viewport>
          <Marquee.Content textStyle="sm">
            {newsItems.map((item, i) => (
              <Marquee.Item key={i} pr="4">
                <HStack
                  align="center"
                  gap="8"
                  fontWeight="medium"
                  textTransform="uppercase"
                >
                  {item}
                  <Circle size="1" bg="colorPalette.solid" />
                </HStack>
              </Marquee.Item>
            ))}
          </Marquee.Content>
        </Marquee.Viewport>
      </Marquee.Root>
    </Flex>
  )
}
