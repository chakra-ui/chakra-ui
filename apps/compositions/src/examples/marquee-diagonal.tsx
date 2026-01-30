import { Circle, HStack, Marquee } from "@chakra-ui/react"

export const MarqueeDiagonal = () => {
  return (
    <Marquee.Root
      position="relative"
      top="25%"
      overflow="hidden"
      transform="rotate(-2deg)"
      bg="bg.emphasized"
      py="4"
    >
      <Marquee.Viewport>
        <Marquee.Content>
          {[...Array(10)].map((_, i) => (
            <Marquee.Item key={i} pr="4">
              <HStack gap="8" textStyle="3xl" fontWeight="medium">
                Chakra Conf 2026
                <Circle size="1.5" bg="colorPalette.solid" />
              </HStack>
            </Marquee.Item>
          ))}
        </Marquee.Content>
      </Marquee.Viewport>
    </Marquee.Root>
  )
}
