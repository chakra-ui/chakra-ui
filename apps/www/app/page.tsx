import { Circle, Icon, Stack } from "@chakra-ui/react"
import { Accessibility } from "./page/accessibility"
import { DesignSystem } from "./page/design-system"
import { Footer } from "./page/footer"
import { Frameworks } from "./page/frameworks"
import { Header } from "./page/header"
import { Hero } from "./page/hero"
import { HeroShowCase } from "./page/hero-showcase"
import { BlitzIcon } from "./page/icons"
import { Partners } from "./page/partners"
import { Sponsors } from "./page/sponsors"
import { Stats } from "./page/stats"
import { Templates } from "./page/templates"
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
        mdDown={{ display: "none" }}
      />

      <Icon
        asChild
        w="245px"
        h="342px"
        pos="absolute"
        top="58px"
        right="67px"
        mdDown={{ display: "none" }}
      >
        <BlitzIcon />
      </Icon>

      <Header />

      <Stack gap={{ base: "24", md: "52" }}>
        <Stack>
          <Hero />
          <HeroShowCase />
        </Stack>
        <Partners />
        <DesignSystem />
        <Accessibility />
        <Stats />
        <Testimonials />
        <Sponsors />
        <Frameworks />
        <Templates />
      </Stack>
      <Footer />
    </Stack>
  )
}
