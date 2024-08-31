import { Blob } from "@/components/site/blob"
import { FooterSection } from "@/components/site/footer.section"
import { HeaderSection } from "@/components/site/header.section"
import { BlitzIcon } from "@/components/site/icons"
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <Stack pos="relative" gap="8" overflow="hidden">
      <BlitzIconSection />
      <Blob height="1200px" width="1200px" left="30%" top="-20%" />
      <HeaderSection />
      {children}
      <FooterSection />
    </Stack>
  )
}
