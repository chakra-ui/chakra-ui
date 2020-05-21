import React from "react"
import { Box } from "@chakra-ui/core"
import PropTypes from "prop-types"
import { MDXProvider } from "@mdx-js/react"
import MDXComponents from "./docs/MDXComponents"
import SideNav from "./docs/SideNav"
import Header from "./header"
import { Footer } from "./footer"

const HomeLayout = ({ children }) => (
  <Box>
    <Header isConstrained />
    {children}
  </Box>
)

const SidebarLayout = ({ children }) => (
  <MDXProvider components={MDXComponents}>
    <Header />
    <Box>
      <SideNav
        display={["none", null, "block"]}
        maxWidth="18rem"
        width="full"
      />
      <Box pl={[0, null, "18rem"]} py={2} mb={20}>
        <Box
          as="main"
          minH="90vh"
          mx="auto"
          maxWidth="46rem"
          pt={8}
          px={5}
          mt="4rem"
        >
          {children}
        </Box>
        <Footer />
      </Box>
    </Box>
  </MDXProvider>
)

const Layout = ({ children, pageContext }) => {
  const Container =
    pageContext && pageContext.layout === "docs" ? SidebarLayout : HomeLayout

  return (
    <Box>
      <Container>{children}</Container>
    </Box>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
