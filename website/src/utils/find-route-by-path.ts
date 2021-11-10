import { RouteItem } from "./get-route-context"

export function removeFromLast(path: string, key: string) {
  const index = path.lastIndexOf(key)
  return index === -1 ? path : path.substring(0, index)
}

export function findRouteByPath(path: string, routes: RouteItem[]): RouteItem {
  for (const route of routes) {
    if (route.path && removeFromLast(route.path, ".") === path) {
      return route
    }

    const childPath = route.routes && findRouteByPath(path, route.routes)

    if (childPath) {
      return childPath
    }
  }
}
