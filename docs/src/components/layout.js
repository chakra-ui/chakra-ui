import React from "react"
import { useLocation } from "@reach/router"
import { Box } from "@chakra-ui/core"
import { MDXProvider } from "@mdx-js/react"
import MDXComponents from "./docs/mdx-components"
import SideNav from "./docs/side-nav"
import Header from "./header"
import { Footer } from "./footer"
import { SkipNavContent, SkipNavLink } from "@chakra-ui/skip-nav"

const HomeLayout = ({ children }) => (
  <Box>
    <Header isConstrained />
    {children}
  </Box>
)

// memoized to prevent in-page anchor link navigation from re-rendering the
// entire layout
const SidebarLayout = ({ children }) => {
  return (
    <MDXProvider components={MDXComponents}>
      <Header />
      <Box>
        <SideNav
          display={["none", null, "block"]}
          maxWidth="18rem"
          width="full"
        />
        <Box pl={[0, null, "18rem"]} py={2} mb={20}>
          <Box as="main" minH="72vh" pt={8} px={5} mt="4rem">
            {children}
          </Box>
          <Footer />
        </Box>
      </Box>
    </MDXProvider>
  )
}

const Layout = ({ children, pageContext }) => {
  const location = useLocation()
  const Container =
    pageContext && pageContext.layout === "docs" ? SidebarLayout : HomeLayout

  return (
    <>
      <SkipNavLink zIndex={20}>Skip to Content</SkipNavLink>
      <SkipNavContent as="main">
        <Container pathname={location.pathname}>{children}</Container>
      </SkipNavContent>
    </>
  )
}

export default Layout
