import * as chakraComponents from "@chakra-ui/core"
import { MDXProvider } from "@mdx-js/react"
import { MDXComponents } from "components/mdx-components"
import { PageContainer } from "components/page-container"
import { Pagination } from "components/pagination"
import { Sidebar } from "components/sidebar/sidebar"
import { docsSidebar } from "configs/docs-sidebar"
import { guidesSidebar } from "configs/guides-sidebar"
import type { ReactNode } from "react"
import { findRouteByPath, removeFromLast } from "utils/find-route-by-path"
import { getRouteContext } from "utils/get-route-context"

type MDXLayoutProps = {
  frontMatter: {
    slug: string
    title: string
    description: string
    editUrl: string
  }
  children: ReactNode
}

// eslint-disable-next-line import/no-default-export
export default function MDXLayout({
  frontMatter,
  children,
}: MDXLayoutProps): JSX.Element {
  const { slug } = frontMatter

  const config = slug.startsWith("/guides") ? guidesSidebar : docsSidebar
  const { routes } = config

  const route = findRouteByPath(removeFromLast(slug, "#"), routes)
  const routeContext = getRouteContext(route, routes)

  return (
    <MDXProvider components={{ ...chakraComponents, ...MDXComponents }}>
      <PageContainer
        frontmatter={frontMatter}
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
