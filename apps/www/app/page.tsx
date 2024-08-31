import { Blob } from "@/components/site/blob"
import { ChakraProSection } from "@/components/site/chakra-pro.section"
import { DesignSystemSection } from "@/components/site/design-system.section"
import { FooterSection } from "@/components/site/footer.section"
import { FrameworkSection } from "@/components/site/framework.section"
import { HeaderSection } from "@/components/site/header.section"
import { HeroSection } from "@/components/site/hero.section"
import { BlitzIcon } from "@/components/site/icons"
import { PartnersSection } from "@/components/site/partners.section"
import { SponsorSection } from "@/components/site/sponsor.section"
import { StatSection } from "@/components/site/stat.section"
import { TestimonialSection } from "@/components/site/testimonial.section"
import { Icon, Stack } from "@chakra-ui/react"

const BlitzIconSection = () => (
  <Icon
    asChild
    w="245px"
    h="342px"
    pos="absolute"
    top="58px"
    right="67px"
    color="fg.inverted"
    hideBelow="md"
  >
    <BlitzIcon />
  </Icon>
)

const AmbientLights = () => {
  return (
    <>
      <Blob top="-50px" left="50%" transform="translateX(-50%)" />
      <Blob bottom="-50%" left="-30%" top="40%" />
      <Blob
        height="2000px"
        width="1200px"
        bottom="0"
        left="40%"
        top="1200px"
        transform="translateX(-40%)"
      />
    </>
  )
}

export default function Page() {
  return (
    <Stack pos="relative" gap="8" overflowX="hidden" overflowY="hidden">
      <AmbientLights />
      <BlitzIconSection />
      <HeaderSection />
      <HeroSection />
      <PartnersSection />
      <DesignSystemSection />
      <StatSection />
      {/* <Accessibility /> */}
      <TestimonialSection />
      <SponsorSection />
      <FrameworkSection />
      <ChakraProSection />
      <FooterSection />
    </Stack>
  )
}
