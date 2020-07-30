import { useRouter } from "next/router"
import sidebar from "sidebar.config"
import { findRouteByPath, removeFromLast } from "utils/find-route-by-path"
import { getRouteContext } from "utils/get-route-context"

function useSidebarRoutes() {
  const router = useRouter()

  const slug = router.asPath
  const { routes } = sidebar

  const _route = findRouteByPath(removeFromLast(slug, "#"), routes)
  const { route, prevRoute, nextRoute } = getRouteContext(_route, routes)

  const title = route?.title?.toString()

  return {
    title,
    routes,
    route,
    prevRoute,
    nextRoute,
  }
}

export default useSidebarRoutes
