import { FlattenNavItem, NavItem, docsConfig } from "@/docs.config"
import { usePathname } from "next/navigation"

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
    return nav.items?.find((item) => item.url === secondaryHref)!
  }

  function getSecondaryNavItems() {
    const nav = getPrimaryNav()
    return nav.items!.map((item) => {
      const firstChild = flattenedItems.find((child) =>
        child.url?.startsWith(`/${nav.url}/${item.url}`),
      )
      return {
        title: item.title,
        url: firstChild?.url,
        current: currentUrl.startsWith(`/${nav.url}/${item.url}`),
      }
    })
  }

  function getFlattenedNavItems(): FlattenNavItem[] {
    const result: FlattenNavItem[] = []
    const iterate = (item: NavItem, parentHref = "") => {
      const url = `${parentHref}/${item.url}`
      if (item.items) {
        item.items.forEach((child) => iterate(child, url))
      } else {
        result.push({ title: item.title, url, status: item.status })
      }
    }
    docsConfig.navigation.forEach((item) => iterate(item))
    return result
  }

  function getCurrentIndex(items: FlattenNavItem[]): number {
    return items.findIndex((item) => currentUrl.startsWith(item.url!))
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
    return secondaryNav?.items?.map((group) => ({
      ...group,
      items: group.items!.map((item) => ({
        status: item.status,
        title: item.title,
        url: `/${primaryNav.url}/${secondaryNav.url}/${group.url}/${item.url}`,
        current: currentUrl.startsWith(
          `/${primaryNav.url}/${secondaryNav.url}/${group.url}${item.url}`,
        ),
      })),
    }))
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
