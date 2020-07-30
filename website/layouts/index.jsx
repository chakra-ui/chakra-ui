import { Box } from "@chakra-ui/core"
import SEO from "components/seo"
import Footer from "components/footer"
import Container from "components/container"
import { SkipNavContent } from "@chakra-ui/skip-nav"
import React from "react"

const Main = (props) => (
  <Box as="main" minH="72vh" pt={8} px={5} mt="4rem" {...props}>
    <Container>{props.children}</Container>
  </Box>
)

const DefaultLayout = (frontmatter) => {
  const { title, description } = frontmatter
  console.log(frontmatter)

  return ({ children }) => {
    return (
      <>
        <SEO title={title} description={description} />
        <Box pl={[0, null, "18rem"]} py={2} mb={20}>
          <SkipNavContent />
          <Main>{children}</Main>
          <Footer />
        </Box>
      </>
    )
  }
}

export default DefaultLayout
