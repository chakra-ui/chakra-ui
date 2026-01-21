import { Box, Marquee, Stack, Text } from "@chakra-ui/react"

const words = ["DESIGN", "DEVELOP", "SHIP", "SCALE", "ITERATE"]

export const MarqueeParallax = () => {
  return (
    <Stack gap="0" py="10" overflow="hidden" bg="black" color="white">
      <Box opacity="0.4">
        <Marquee.Root style={{ "--marquee-duration": "60s" } as any}>
          <Marquee.Viewport>
            <Marquee.Content>
              {words.map((text, i) => (
                <MarqueeItem key={i} text={text} fontSize="4xl" />
              ))}
            </Marquee.Content>
          </Marquee.Viewport>
        </Marquee.Root>
      </Box>

      <Box opacity="0.7">
        <Marquee.Root
          style={
            {
              "--marquee-duration": "30s",
              "--marquee-direction": "reverse",
            } as any
          }
        >
          <Marquee.Viewport>
            <Marquee.Content style={{ animationDirection: "reverse" }}>
              {words.map((text, i) => (
                <MarqueeItem key={i} text={text} fontSize="6xl" />
              ))}
            </Marquee.Content>
          </Marquee.Viewport>
        </Marquee.Root>
      </Box>

      <Box opacity="1">
        <Marquee.Root style={{ "--marquee-duration": "15s" } as any}>
          <Marquee.Viewport>
            <Marquee.Content>
              {words.map((text, i) => (
                <MarqueeItem key={i} text={text} fontSize="8xl" />
              ))}
            </Marquee.Content>
          </Marquee.Viewport>
        </Marquee.Root>
      </Box>
    </Stack>
  )
}

const MarqueeItem = ({ text, fontSize }: any) => (
  <Marquee.Item style={{ padding: "0 2rem" }}>
    <Text fontSize={fontSize} fontWeight="black" letterSpacing="tighter">
      {text}
    </Text>
  </Marquee.Item>
)
