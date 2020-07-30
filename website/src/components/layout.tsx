import React from "react"
import { useRouter } from "next/router"
import { Box } from "@chakra-ui/core"
import { MDXProvider } from "@mdx-js/react"
import MDXComponents from "./mdx-components"
import SideNav from "./sidebar"
import Header from "./header"
import { Footer } from "./footer"
import { SkipNavContent, SkipNavLink } from "@chakra-ui/skip-nav"
import BottomNav from "./bottom-nav"

const Main = (props) => (
  <Box as="main" minH="72vh" pt={8} px={5} mt="4rem" {...props} />
)

const HomeLayout = ({ children }) => (
  <Box>
    <Header />
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
          <Main>{children}</Main>
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
      <Box mb="80px">
        <SkipNavContent />
        <Main>{children}</Main>
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
  const { pathname } = useRouter()
  const Container: any = pageContext
    ? getLayout(pageContext.layout)
    : React.Fragment

  return (
    <>
      <SkipNavLink zIndex={20}>Skip to Content</SkipNavLink>
      <Container pathname={pathname}>{children}</Container>
      <BottomNav />
    </>
  )
}

export default Layout
