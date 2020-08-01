import { Box, Flex } from "@chakra-ui/core"
import SEO from "components/seo"
import Footer from "components/footer"
import Container from "components/container"
import { SkipNavContent } from "@chakra-ui/skip-nav"
import React from "react"
import Sidebar from "components/sidebar/sidebar"

const Main = (props) => (
  <Box as="main" pt={8} px={5} mt="4rem" {...props}>
    <Container>{props.children}</Container>
  </Box>
)

const DefaultLayout = (frontmatter) => {
  const { title, description } = frontmatter

  return ({ children }) => {
    return (
      <>
        <SEO title={title} description={description} />
        <Box w="full" px="1rem" pb="12" pt="6" mx="auto" maxW="1400px">
          <SkipNavContent />
          <Flex pos="relative">
            <Sidebar />
            <Box maxW="60ch">
              <Main>{children}</Main>
              <Footer />
            </Box>
          </Flex>
        </Box>
      </>
    )
  }
}

export default DefaultLayout
