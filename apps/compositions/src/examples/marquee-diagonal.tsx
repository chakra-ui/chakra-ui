import { Box, Marquee, Text } from "@chakra-ui/react"

export const MarqueeDiagonal = () => {
  return (
    <Box position="relative" h="500px" overflow="hidden" bg="gray.900">
      <Box
        position="absolute"
        top="50%"
        left="50%"
        width="150%"
        transform="translate(-50%, -50%) rotate(-15deg)"
        bg="yellow.400"
        py="4"
      >
        <Marquee.Root style={{ "--marquee-duration": "20s" } as any}>
          <Marquee.Viewport>
            <Marquee.Content>
              {[...Array(10)].map((_, i) => (
                <Marquee.Item key={i} style={{ padding: "0 3rem" }}>
                  <Text
                    color="black"
                    fontSize="3xl"
                    fontWeight="bold"
                    textTransform="uppercase"
                  >
                    Breaking Boundaries •
                  </Text>
                </Marquee.Item>
              ))}
            </Marquee.Content>
          </Marquee.Viewport>
        </Marquee.Root>
      </Box>
    </Box>
  )
}
