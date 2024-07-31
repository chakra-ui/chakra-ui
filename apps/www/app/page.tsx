import {
  Box,
  Button,
  Circle,
  Container,
  Heading,
  Icon,
  Span,
  Stack,
  Text,
} from "@chakra-ui/react"
import { HiArrowRight } from "react-icons/hi"
import { Header } from "./page/header"
import { HeroShowCase } from "./page/hero-showcase"
import { BlitzIcon } from "./page/icons"

export default function Page() {
  return (
    <Box bg="black" pos="relative">
      <Circle
        size="452px"
        pos="absolute"
        top="111px"
        left="50%"
        transform="translateX(-50%)"
        opacity="0.15"
        filter="blur(250px)"
        bg="teal.300"
      />

      <Icon asChild w="245px" h="342px" pos="absolute" top="58px" right="67px">
        <BlitzIcon />
      </Icon>

      <Header />

      <Container pt="8">
        <Stack gap="8">
          <Button
            size="lg"
            colorPalette="teal"
            variant="outline"
            w="fit-content"
            bg="#061416"
            px="1.5"
          >
            Celebrating the launch of v3
            <HiArrowRight />
          </Button>
          <Stack gap="5" pr="4" maxW="3xl" px="1.5">
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
            <Text fontSize="2xl" color="fg.muted" fontWeight="medium">
              Beautiful, accessible, React components for high-quality web apps
              and design systems.
            </Text>
          </Stack>

          <HeroShowCase />

          <Stack pt="40"></Stack>
        </Stack>
      </Container>
    </Box>
  )
}
