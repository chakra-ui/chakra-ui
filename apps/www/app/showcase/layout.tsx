import { Container, SkipNavContent, SkipNavLink } from "@chakra-ui/react"
import { Header } from "../docs/header"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SkipNavLink>Skip to Content</SkipNavLink>
      <Header />
      <main>
        {/* <MobileSidebarNav /> */}
        <Container display="flex">
          {/* <SidebarStart />
          <SkipNavContent /> */}
          {children}
        </Container>
      </main>
    </>
  )
}
