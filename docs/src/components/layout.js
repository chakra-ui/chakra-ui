import React from "react"
import { useLocation } from "@reach/router"
import { Box } from "@chakra-ui/core"
import PropTypes from "prop-types"
import { MDXProvider } from "@mdx-js/react"
import MDXComponents from "./docs/mdx-components"
import SideNav from "./docs/side-nav"
import Header from "./header"
import { Footer } from "./footer"

const HomeLayout = ({ children }) => (
  <Box>
    <Header isConstrained />
    {children}
  </Box>
)

// memoized to prevent in-page anchor link navigation from re-rendering the
// entire layout
const SidebarLayout = React.memo(
  ({ children }) => {
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
            <Box as="main" minH="90vh" pt={8} px={5} mt="4rem">
              {children}
            </Box>
            <Footer />
          </Box>
        </Box>
      </MDXProvider>
    )
  },
  (prev, next) => prev.pathname === next.pathname,
)

const Layout = ({ children, pageContext }) => {
  const location = useLocation()
  const Container =
    pageContext && pageContext.layout === "docs" ? SidebarLayout : HomeLayout

  return (
    <Box>
      <Container pathname={location.pathname}>{children}</Container>
    </Box>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
