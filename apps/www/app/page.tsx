import { Circle, Container, Icon, Stack } from "@chakra-ui/react"
import { Accessibility } from "./page/accessibility"
import { DesignSystem } from "./page/design-system"
import { Header } from "./page/header"
import { Hero } from "./page/hero"
import { HeroShowCase } from "./page/hero-showcase"
import { BlitzIcon } from "./page/icons"
import { Partners } from "./page/partners"
import { Stats } from "./page/stats"
import { Testimonials } from "./page/testimonials"

export default function Page() {
  return (
    <Stack bg="black" pos="relative" gap="8" overflowX="hidden">
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

      <Container>
        <Stack>
          <Hero />
          <HeroShowCase />
        </Stack>
      </Container>

      <Stack gap="52">
        <Container>
          <Partners />
        </Container>
        <Container>
          <DesignSystem />
        </Container>
        <Container>
          <Accessibility />
        </Container>
        <Container>
          <Stats />
        </Container>
        <Testimonials />
      </Stack>
    </Stack>
  )
}
