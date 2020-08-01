import { Box, Flex } from "@chakra-ui/core"
import SEO from "components/seo"
import Footer from "components/footer"
import { SkipNavContent } from "@chakra-ui/skip-nav"
import React from "react"
import Sidebar from "components/sidebar/sidebar"
import Pagination from "components/pagination"
import sidebar from "sidebar.config"
import { findRouteByPath, removeFromLast } from "utils/find-route-by-path"
import { getRouteContext } from "utils/get-route-context"
import EditPageLink from "components/github-edit-link"

const DefaultLayout = (frontmatter) => {
  const { title, description, slug, editUrl } = frontmatter

  function Component({ children }) {
    const { routes } = sidebar
    const _route = findRouteByPath(removeFromLast(slug, "#"), routes)
    const { prevRoute, nextRoute } = getRouteContext(_route, routes)

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
                <Box mt="40px">
                  {editUrl && <EditPageLink href={editUrl} />}
                </Box>
                <Pagination next={nextRoute} previous={prevRoute} />
              </Box>
              <Footer />
            </div>
          </Flex>
        </Box>
      </>
    )
  }

  return Component
}

export default DefaultLayout
