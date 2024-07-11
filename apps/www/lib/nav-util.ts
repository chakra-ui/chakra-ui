import { docsConfig } from "@/docs.config"

const currentHref = "/docs/get-started/overview/installation"

export const NavUtil = {
  currentHref,
  getPrimaryNavItems: () => {
    return docsConfig.navigation.map((item) => ({
      label: item.label,
      href: `/${item.href}`,
      current: currentHref.startsWith(`/${item.href}`),
    }))
  },
  getPrimaryNav: () => {
    const [primaryHref] = currentHref.split("/").slice(1)
    return docsConfig.navigation.find((item) => item.href === primaryHref)!
  },
  getSecondaryNav: () => {
    const [, secondaryHref] = currentHref.split("/").slice(1)
    const primaryNav = NavUtil.getPrimaryNav()
    return primaryNav?.items?.find((item) => item.href === secondaryHref)!
  },
  getSecondaryNavItems: () => {
    const primaryNav = NavUtil.getPrimaryNav()
    return primaryNav?.items!.map((item) => ({
      label: item.label,
      href: `/${primaryNav.href}/${item.href}`,
      current: currentHref.startsWith(`/${primaryNav.href}/${item.href}`),
    }))
  },
  getSidebarNavItems: () => {
    const primaryNav = NavUtil.getPrimaryNav()
    const secondaryNav = NavUtil.getSecondaryNav()
    return secondaryNav?.items?.map((group) => ({
      ...group,
      items: group.items!.map((item) => ({
        status: item.status,
        label: item.label,
        href: `/${primaryNav.href}/${secondaryNav.href}/${group.href}/${item.href}`,
        current: currentHref.startsWith(
          `/${primaryNav.href}/${secondaryNav.href}/${group.href}${item.href}`,
        ),
      })),
    }))
  },
}
