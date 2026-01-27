"use client"
import { Box, Flex, Marquee, Text } from "@chakra-ui/react"
import { IoEllipse } from "react-icons/io5"

const newsItems = [
  "Bitcoin hits all-time high",
  "New React version released",
  "SpaceX successfully lands rocket",
  "Global markets rally today",
  "AI regulation talks begin in EU",
]

export const MarqueeNewsTicker = () => {
  return (
    <Flex
      align="center"
      bg="red.600"
      color="white"
      borderY="2px solid"
      borderColor="red.800"
    >
      <Box
        bg="red.800"
        px="4"
        py="2"
        fontWeight="bold"
        zIndex={2}
        boxShadow="5px 0 10px rgba(0,0,0,0.2)"
      >
        LATEST NEWS
      </Box>

      <Marquee.Root style={{ "--marquee-duration": "40s" } as any}>
        <Marquee.Viewport>
          <Marquee.Content>
            {newsItems.map((item, i) => (
              <Marquee.Item key={i} padding="0 2rem">
                <Flex align="center" gap="3">
                  <Text
                    fontWeight="medium"
                    fontFamily="mono"
                    textTransform="uppercase"
                  >
                    {item}
                  </Text>
                  <Box as={IoEllipse} color="red.200" />
                </Flex>
              </Marquee.Item>
            ))}
          </Marquee.Content>
        </Marquee.Viewport>
      </Marquee.Root>
    </Flex>
  )
}
