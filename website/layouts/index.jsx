import { Box, Flex } from "@chakra-ui/core"
import SEO from "components/seo"
import Footer from "components/footer"
import { SkipNavContent } from "@chakra-ui/skip-nav"
import React from "react"
import Sidebar from "components/sidebar/sidebar"

const DefaultLayout = (frontmatter) => {
  const { title, description } = frontmatter

  return ({ children }) => {
    return (
      <>
        <SEO title={title} description={description} />
        <Box w="full" px="1rem" pb="12" pt="6" mx="auto" maxW="1024px">
          <Flex pos="relative">
            <Sidebar />
            <SkipNavContent />
            <div>
              <Box pt={8} px={5} mt="4rem">
                {children}
              </Box>
              <Footer />
            </div>
          </Flex>
        </Box>
      </>
    )
  }
}

export default DefaultLayout
