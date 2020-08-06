import { Box, Flex, chakra } from "@chakra-ui/core"
import { SkipNavContent, SkipNavLink } from "@chakra-ui/skip-nav"
import EditPageLink from "components/edit-page-button"
import Footer from "components/footer"
import Header from "components/header"
import Pagination from "components/pagination"
import Container from "components/container"
import SEO from "components/seo"
import Sidebar from "components/sidebar/sidebar"
import React from "react"
import { findRouteByPath, removeFromLast } from "utils/find-route-by-path"
import { getRouteContext } from "utils/get-route-context"

const DocsContainer = ({ frontmatter, sidebarRoutes: routes, children }) => {
  const { title, description, slug, editUrl } = frontmatter

  const route = findRouteByPath(removeFromLast(slug, "#"), routes)
  const { prevRoute, nextRoute } = getRouteContext(route, routes)

  return (
    <>
      <SEO title={title} description={description} />
      <SkipNavLink zIndex={20}>Skip to Content</SkipNavLink>
      <Header />
      <Container>
        <Flex>
          <Sidebar routes={routes} />
          <div style={{ flex: 1 }}>
            <SkipNavContent />
            <Box pt={3} px={5} mt="4.5rem" mx="auto" maxW="48rem" minH="80vh">
              <Box>
                <chakra.h1 apply="mdx.h1">{title}</chakra.h1>
              </Box>
              {children}
              <Box mt="40px">{editUrl && <EditPageLink href={editUrl} />}</Box>
              <Pagination next={nextRoute} previous={prevRoute} />
            </Box>
            <Footer />
          </div>
        </Flex>
      </Container>
    </>
  )
}

export default DocsContainer
