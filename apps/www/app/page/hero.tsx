import { Button, Heading, Span, Stack, Text } from "@chakra-ui/react"
import { HiArrowRight } from "react-icons/hi"

const V3LaunchButton = () => (
  <Button
    size="md"
    colorPalette="teal"
    variant="outline"
    w="fit-content"
    bg="#061416"
    px="4"
    py="2.5"
    fontWeight="bold"
    gap="2.5"
  >
    Celebrating the launch of v3
    <HiArrowRight />
  </Button>
)

const Intro = () => (
  <Heading size="5xl" fontWeight="bold">
    Chakra UI is a component system for building products{" "}
    <Span
      color="teal.500"
      pos="relative"
      px="2"
      display="inline-block"
      _before={{
        pos: "absolute",
        content: "''",
        w: "full",
        h: "full",
        bg: "teal.500/10",
        bottom: "-3px",
        left: "0",
        borderRight: "solid 1.5px",
        borderColor: "currentColor",
      }}
    >
      with speed
    </Span>
  </Heading>
)

const Description = () => (
  <Text fontSize="2xl" color="gray.400" fontWeight="medium">
    Beautiful, accessible, React components for high-quality web apps and design
    systems.
  </Text>
)

export const Hero = () => (
  <>
    <V3LaunchButton />
    <Stack gap="5" pr="4" maxW="3xl" px="1.5">
      <Intro />
      <Description />
    </Stack>
  </>
)
