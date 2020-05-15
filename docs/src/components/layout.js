import React from "react"
import { Box } from "@chakra-ui/core"
import PropTypes from "prop-types"
import Header from "./header"
import SideNav from "./docs/SideNav"
import { Footer } from "./footer"

const HomeLayout = ({ children }) => <div>{children}</div>

const SidebarLayout = ({ children }) => (
  <Box>
    <SideNav display={["none", null, "block"]} maxWidth="18rem" width="full" />
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
)

const Layout = ({ children, pageContext }) => {
  const Container =
    pageContext && pageContext.layout === "docs" ? SidebarLayout : HomeLayout

  return (
    <Box>
      <Header />
      <Container>{children}</Container>
    </Box>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
