import { Icon, Stack } from "@chakra-ui/react"
import { Accessibility } from "./page/accessibility"
import { Blob } from "./page/blob"
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

const BlitzIconSection = () => (
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
)

const MainContent = () => (
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
)

export default function Page() {
  return (
    <Stack
      className="dark"
      color="white"
      bg="var(--bg)"
      pos="relative"
      gap="8"
      overflowX="hidden"
      css={{
        "--bg": "colors.black",
      }}
    >
      <Blob top="111px" left="50%" transform="translateX(-50%)" />
      <BlitzIconSection />
      <Header />
      <MainContent />
      <Footer />
    </Stack>
  )
}
