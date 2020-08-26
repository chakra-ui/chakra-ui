import * as React from "react"
import dynamic from "next/dynamic"
import { Box, Flex, chakra } from "@chakra-ui/core"
import { SkipNavContent, SkipNavLink } from "@chakra-ui/skip-nav"
import EditPageLink from "components/edit-page-button"
import Footer from "components/footer"
import Header from "components/header"
import Container from "components/container"
import SEO from "components/seo"

const PageContainer = ({
  frontmatter,
  children,
  sidebar,
  pagination,
}: {
  frontmatter: any
  children: React.ReactNode
  sidebar?: any
  pagination?: any
}) => {
  const { title, description, editUrl } = frontmatter

  return (
    <>
      <SEO title={title} description={description} />
      <SkipNavLink zIndex={20}>Skip to Content</SkipNavLink>
      <Header />
      <Container>
        <Flex>
          {sidebar || null}
          <div style={{ flex: 1 }}>
            <SkipNavContent />
            <Box pt={3} px={5} mt="4.5rem" mx="auto" maxW="48rem" minH="80vh">
              <Box>
                <chakra.h1 apply="mdx.h1">{title}</chakra.h1>
              </Box>
              {children}
              <Box mt="40px">{editUrl && <EditPageLink href={editUrl} />}</Box>
              {pagination || null}
            </Box>
            <Footer />
          </div>
        </Flex>
      </Container>
    </>
  )
}

export default PageContainer
