import { Container, Flex, SkipNavContent, SkipNavLink } from "@chakra-ui/react"
import { GlobalStyles } from "./global-styles"
import { Header } from "./header"
import { SidebarStart } from "./sidebar"

// export default function Layout({ children }: { children: React.ReactNode }) {
//   return (
//     <Box
//       css={{
//         "--header-height": { base: "64px", md: "104px" },
//         "--content-height": "calc(100dvh - var(--header-height))",
//       }}
//     >
//       <Header />
//       <Container pt="var(--header-height)" minHeight="var(--content-height)">
//         <Flex>
//           <SidebarStart />
//           {children}
//         </Flex>
//       </Container>
//     </Box>
//   )
// }

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SkipNavLink>Skip to Content</SkipNavLink>
      <GlobalStyles />
      <Header />
      <Container as="main">
        <SkipNavContent />
        <Flex>
          <SidebarStart />
          {children}
        </Flex>
      </Container>
    </>
  )
}
