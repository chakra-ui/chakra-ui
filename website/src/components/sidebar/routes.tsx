import { useRouter } from "next/router"
import React from "react"
import { RouteItem } from "utils/get-route-context"
import SidebarCategory from "./category"
import SidebarHeading from "./heading"

function SidebarRoutes({
  isMobile,
  routes: currentRoutes,
  level = 1,
}: {
  isMobile?: boolean
  routes: RouteItem[]
  level?: number
}) {
  const { asPath: slug, pathname } = useRouter()

  return (currentRoutes as RouteItem[]).map(
    ({ path, title, routes, heading, open }) => {
      if (routes) {
        const pathname = routes.find((r) => r.path).path

        const selected = slug.startsWith(pathname as any)

        const opened = selected || isMobile ? false : open

        if (heading) {
          return (
            <SidebarHeading key={pathname} title={title}>
              <SidebarRoutes isMobile={isMobile} routes={routes} />
            </SidebarHeading>
          )
        }

        return (
          <SidebarCategory
            key={pathname}
            isMobile={isMobile}
            title={title}
            selected={selected}
            opened={opened}
          >
            <SidebarRoutes
              isMobile={isMobile}
              routes={routes}
              level={level + 1}
            />
          </SidebarCategory>
        )
      }

      const selected = slug.startsWith(path)
      const route = { href: path, path, title, pathname, selected }

      return (
        <SidebarPost
          key={title}
          isMobile={isMobile}
          level={level}
          route={route}
        />
      )
    },
  )
}

export default SidebarRoutes
