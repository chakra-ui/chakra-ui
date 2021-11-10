import * as chakraComponents from "@chakra-ui/react"
import { MDXProvider } from "@mdx-js/react"
import MDXComponents from "components/mdx-components"
import PageContainer from "components/page-container"
import Pagination from "components/pagination"
import Sidebar from "components/sidebar/sidebar"
import docsSidebar from "configs/docs-sidebar.json"
import guidesSidebar from "configs/guides-sidebar.json"
import blogSidebar from "configs/blog-sidebar.json"
import * as React from "react"
import { findRouteByPath, removeFromLast } from "utils/find-route-by-path"
import { getRouteContext } from "utils/get-route-context"

export function getRoutes(slug: string) {
  // for home page, use docs sidebat
  if (slug === "/") return docsSidebar.routes

  const configMap = {
    "/resources": docsSidebar,
    "/guides": guidesSidebar,
    "/blog": blogSidebar,
    "/docs": docsSidebar,
  }

  const [_path, sidebar] =
    Object.entries(configMap).find(([path, _sidebar]) =>
      slug.startsWith(path),
    ) ?? []

  return sidebar?.routes ?? []
}

function MDXLayout({ frontmatter, children }) {
  const routes = getRoutes(frontmatter.slug)

  const route = findRouteByPath(removeFromLast(frontmatter.slug, "#"), routes)
  const routeContext = getRouteContext(route, routes)

  return (
    <MDXProvider components={{ ...chakraComponents, ...MDXComponents }}>
      <PageContainer
        frontmatter={frontmatter}
        sidebar={<Sidebar routes={routes} />}
        pagination={
          <Pagination
            next={routeContext.nextRoute}
            previous={routeContext.prevRoute}
          />
        }
      >
        {children}
      </PageContainer>
    </MDXProvider>
  )
}

export default MDXLayout
