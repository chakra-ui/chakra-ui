import { FooterSection } from "@/components/site/footer.section"
import { HeaderSection } from "@/components/site/header.section"
import { SkipNavContent, SkipNavLink } from "@chakra-ui/react"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SkipNavLink>Skip to Content</SkipNavLink>
      <HeaderSection />
      <main>
        <SkipNavContent />
        {children}
      </main>
      <FooterSection />
    </>
  )
}
