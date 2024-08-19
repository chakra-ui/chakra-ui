import { Container, Flex, SkipNavContent, SkipNavLink } from "@chakra-ui/react"
import { GlobalStyles } from "./global-styles"
import { Header } from "./header"
import { MobileSidebarNav, SidebarStart } from "./sidebar"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SkipNavLink>Skip to Content</SkipNavLink>
      <GlobalStyles />
      <Header />
      <main>
        <MobileSidebarNav />
        <Container display="flex">
          <SidebarStart />
          <SkipNavContent />
          {children}
        </Container>
      </main>
    </>
  )
}
