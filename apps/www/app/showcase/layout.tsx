import { Header } from "@/components/docs/header"
import { Container, SkipNavContent, SkipNavLink } from "@chakra-ui/react"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SkipNavLink>Skip to Content</SkipNavLink>
      <Header />
      <main>
        <Container display="flex">
          <SkipNavContent />
          {children}
        </Container>
      </main>
    </>
  )
}
