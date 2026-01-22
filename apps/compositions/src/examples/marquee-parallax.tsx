import { Marquee, Stack, Text } from "@chakra-ui/react"

const words = ["DESIGN", "DEVELOP", "SHIP", "SCALE", "ITERATE"]

export const MarqueeParallax = () => {
  return (
    <Stack gap="0" py="10" overflow="hidden" bg="black" color="white">
      <Marquee.Root
        opacity="0.4"
        style={{ "--marquee-duration": "60s" } as any}
      >
        <Marquee.Viewport>
          <Marquee.Content>
            {words.map((text, i) => (
              <MarqueeItem key={i} text={text} fontSize="4xl" />
            ))}
          </Marquee.Content>
        </Marquee.Viewport>
      </Marquee.Root>

      <Marquee.Root
        reverse
        opacity="0.7"
        style={
          {
            "--marquee-duration": "30s",
            "--marquee-direction": "reverse",
          } as any
        }
      >
        <Marquee.Viewport>
          <Marquee.Content>
            {words.map((text, i) => (
              <MarqueeItem key={i} text={text} fontSize="6xl" />
            ))}
          </Marquee.Content>
        </Marquee.Viewport>
      </Marquee.Root>

      <Marquee.Root style={{ "--marquee-duration": "15s" } as any}>
        <Marquee.Viewport>
          <Marquee.Content>
            {words.map((text, i) => (
              <MarqueeItem key={i} text={text} fontSize="8xl" />
            ))}
          </Marquee.Content>
        </Marquee.Viewport>
      </Marquee.Root>
    </Stack>
  )
}

const MarqueeItem = ({ text, fontSize }: any) => (
  <Marquee.Item padding="0 2rem">
    <Text fontSize={fontSize} fontWeight="black" letterSpacing="tighter">
      {text}
    </Text>
  </Marquee.Item>
)
