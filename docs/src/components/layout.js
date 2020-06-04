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
    <SkipNavContent />
    {children}
  </Box>
)

const DocsLayout = ({ children }) => {
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
          <SkipNavContent />
          <Box as="main" minH="72vh" pt={8} px={5} mt="4rem">
            {children}
          </Box>
          <Footer />
        </Box>
      </Box>
    </MDXProvider>
  )
}

const GuidesLayout = ({ children }) => {
  return (
    <MDXProvider components={MDXComponents}>
      <Header />

      <Box>
        <Box as="main" minH="72vh" pt={8} px={5} mt="4rem">
          {children}
        </Box>
        <Footer />
      </Box>
    </MDXProvider>
  )
}

function getLayout(context) {
  switch (context) {
    case "docs":
      return DocsLayout
    case "guides":
      return GuidesLayout
    default:
      return HomeLayout
  }
}

const Layout = ({ children, pageContext }) => {
  const location = useLocation()
  const Container = getLayout(pageContext.layout)

  return (
    <>
      <SkipNavLink zIndex={20}>Skip to Content</SkipNavLink>
      <Container pathname={location.pathname}>{children}</Container>
    </>
  )
}

export default Layout
