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
import { Accessibility } from "./page/accessibility"
import { DesignSystem } from "./page/design-system"
import { Header } from "./page/header"
import { HeroShowCase } from "./page/hero-showcase"
import { BlitzIcon } from "./page/icons"
import { Partners } from "./page/partners"
import { Stats } from "./page/stats"

export default function Page() {
  return (
    <Box bg="black" pos="relative">
      <Circle
        size="452px"
        pos="absolute"
        top="111px"
        left="50%"
        transform="translateX(-50%)"
        opacity="0.25"
        filter="blur(250px)"
        bg="teal.500"
      />

      <Icon asChild w="245px" h="342px" pos="absolute" top="58px" right="67px">
        <BlitzIcon />
      </Icon>

      <Header />

      <Container pt="8">
        <Stack gap="8">
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
            <Text fontSize="2xl" color="gray.400" fontWeight="medium">
              Beautiful, accessible, React components for high-quality web apps
              and design systems.
            </Text>
          </Stack>

          <HeroShowCase />

          <Stack gap="52">
            <Partners />

            <DesignSystem />

            <Accessibility />

            <Stats />
          </Stack>
        </Stack>
      </Container>
    </Box>
  )
}
