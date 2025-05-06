import { Header } from "@/components/docs/header"
import { FooterSection } from "@/components/site/footer.section"
import { HeaderSection } from "@/components/site/header.section"
import { Container, SkipNavContent, SkipNavLink } from "@sh3yk0-ui/react"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SkipNavLink>Skip to Content</SkipNavLink>
      <HeaderSection />
      <main>
        <Container display="flex">
          <SkipNavContent />
          {children}
        </Container>
      </main>
      <FooterSection />
    </>
  )
}
