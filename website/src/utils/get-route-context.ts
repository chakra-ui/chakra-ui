export type RouteItem = {
  title: string
  path?: string
  open?: boolean
  heading?: boolean
  routes?: RouteItem[]
}

export type Routes = {
  routes: RouteItem[]
}

export type Page = {
  id: string
  html: string
  title: string
  toc: unknown
}

export type Post = {
  slug: string
  content: string
  title: string
  date: string
  author: string
  toc: unknown
  ogImage: {
    url: string
  }
  coverImage: string
}

export type RouteContext = {
  parent?: RouteItem
  prevRoute?: RouteItem
  nextRoute?: RouteItem
  route?: RouteItem
}
/**
 * Returns the siblings of a specific route (that is the previous and next routes).
 */
// eslint-disable-next-line sonarjs/cognitive-complexity
export function getRouteContext(
  _route: RouteItem,
  routes: RouteItem[],
  ctx: RouteContext = {},
): RouteContext {
  if (!_route) {
    return ctx
  }

  const { path } = _route
  const { parent } = ctx

  for (const route of routes) {
    if (route.routes) {
      ctx.parent = route
      // eslint-disable-next-line no-param-reassign
      ctx = getRouteContext(_route, route.routes, ctx)

      // If the active route and the next route was found in nested routes, return it
      if (ctx.nextRoute) {
        return ctx
      }
    }
    if (!route) {
      continue
    }
    if (!route.path) {
      continue
    }

    if (ctx.route) {
      // const isNext = parent && i === 0
      ctx.nextRoute = route
      return ctx
    }

    if (route && route.path === path) {
      ctx.route = {
        ..._route,
        title:
          parent && !parent.heading
            ? `${parent.title}: ${_route.title}`
            : _route.title,
      }
      // Continue the loop until we know the next route
      continue
    }

    // const isPrev = parent && !parent.heading && !routes[i + 1]?.path
    ctx.prevRoute = route
  }

  // The loop ended and the previous route was found, or nothing
  return ctx
}
