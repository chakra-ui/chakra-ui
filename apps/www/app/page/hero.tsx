import {
  Badge,
  Button,
  Container,
  Heading,
  Span,
  Stack,
  Text,
} from "@chakra-ui/react"
import { HiArrowRight } from "react-icons/hi"

const V3LaunchButton = () => (
  <Badge
    size={{ base: "sm", sm: "md" }}
    colorPalette="teal"
    variant="outline"
    w="fit-content"
    bg="#061416"
    px={{ base: "2", md: "4" }}
    py={{ base: "1", md: "2.5" }}
    fontWeight={{ md: "bold" }}
    gap={{ base: "1", md: "2.5" }}
  >
    Celebrating the launch of v3
    <HiArrowRight />
  </Badge>
)

const Intro = () => (
  <Heading textStyle={{ base: "3xl", md: "5xl" }} fontWeight="bold">
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
  <Text
    textStyle={{ base: "lg", md: "2xl" }}
    color="gray.400"
    fontWeight="medium"
  >
    Beautiful, accessible, React components for high-quality web apps and design
    systems.
  </Text>
)

export const Hero = () => (
  <Container>
    <Stack gap={{ base: "4", md: "6" }}>
      <V3LaunchButton />
      <Stack gap="5" pr="4" maxW="3xl" px="1.5">
        <Intro />
        <Description />
      </Stack>
    </Stack>
  </Container>
)
