import { FlattenNavItem, NavItem, docsConfig } from "@/docs.config"
import { usePathname } from "next/navigation"

const join = (...args: Array<string | undefined>) =>
  `/${args.filter(Boolean).join("/")}`

export function useRoute() {
  const currentUrl = usePathname()

  const [primaryHref, secondaryHref] = currentUrl.split("/").slice(1)
  const flattenedItems = getFlattenedNavItems()

  function getPrimaryNavItems() {
    return docsConfig.navigation.map((item) => {
      const firstChild = flattenedItems.find((child) =>
        child.url?.startsWith(`/${item.url!}`),
      )
      return {
        title: item.title,
        url: firstChild?.url,
        current: currentUrl.startsWith(`/${item.url}`),
      }
    })
  }

  function getPrimaryNav() {
    return docsConfig.navigation.find((item) => item.url === primaryHref)!
  }

  function getSecondaryNav() {
    const nav = getPrimaryNav()
    return nav?.items?.find((item) => item.url === secondaryHref)!
  }

  function getSecondaryNavItems() {
    const nav = getPrimaryNav()
    return (
      nav?.items?.map((item) => {
        const firstChild = flattenedItems.find((child) =>
          child.url?.startsWith(join(nav.url, item.url)),
        )
        return {
          title: item.title,
          url: firstChild?.url,
          current: currentUrl.startsWith(join(nav.url, item.url)),
        }
      }) || []
    )
  }

  function getFlattenedNavItems(): FlattenNavItem[] {
    const result: FlattenNavItem[] = []
    const iterate = (item: NavItem, parentUrl = "") => {
      const url = item.external
        ? item.url
        : item.url
          ? `${parentUrl}/${item.url}`
          : parentUrl
      if (item.items) {
        item.items.forEach((child) => iterate(child, url))
      } else {
        result.push({
          title: item.title,
          url,
          status: item.status,
          external: item.external,
        })
      }
    }
    docsConfig.navigation.forEach((item) => iterate(item))
    return result
  }

  function getCurrentIndex(items: FlattenNavItem[]): number {
    return items.findIndex((item) => currentUrl === item.url!)
  }

  function getNextItem(): NavItem | null {
    const items = getFlattenedNavItems()
    const index = getCurrentIndex(items)
    return items[index + 1] || null
  }

  function getPrevItem(): NavItem | null {
    const items = getFlattenedNavItems()
    const index = getCurrentIndex(items)
    return items[index - 1] || null
  }

  function getSidebarNavItems() {
    const primaryNav = getPrimaryNav()
    const secondaryNav = getSecondaryNav()
    return (
      secondaryNav?.items?.map((group) => ({
        ...group,
        items:
          group?.items?.map((item) => ({
            status: item.status,
            title: item.title,
            url:
              item.url?.startsWith("http") || item.external
                ? item.url
                : join(primaryNav.url, secondaryNav.url, group.url, item.url),
            current: currentUrl.startsWith(
              join(primaryNav.url, secondaryNav.url, group.url, item.url),
            ),
            external: item.external,
          })) || [],
      })) || []
    )
  }

  return {
    currentUrl,
    getPrimaryNavItems,
    getSecondaryNavItems,
    getPrimaryNav,
    getSecondaryNav,
    getSidebarNavItems,
    getNextItem,
    getPrevItem,
  }
}
