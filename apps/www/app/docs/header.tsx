"use client"

import { ColorModeButton } from "@/components/color-mode-button"
import { Logo } from "@/components/logo"
import { MobileSearchButton, SearchButton } from "@/components/search-button"
import { SocialLinks } from "@/components/social-links"
import { VersionMenu } from "@/components/version-menu"
import { useRoute } from "@/lib/use-route"
import {
  Box,
  Container,
  Drawer,
  HStack,
  IconButton,
  Portal,
  Spacer,
  VStack,
  chakra,
} from "@chakra-ui/react"
import Link from "next/link"
import { useRef, useSyncExternalStore } from "react"
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai"

const usePrimaryNavItems = () => {
  const route = useRoute()

  return route.getPrimaryNavItems()
}

const useSecondaryNavItems = () => {
  const route = useRoute()

  return route.getSecondaryNavItems()
}

type Listener = () => void

interface MenuStore {
  isOpen: boolean
  listeners: Set<Listener>
  getState: () => boolean
  setState: (newState: boolean) => void
  subscribe: (listener: Listener) => () => void
}

const store: MenuStore = {
  isOpen: false,
  listeners: new Set(),

  getState() {
    return this.isOpen
  },

  setState(newState: boolean) {
    this.isOpen = newState
    this.listeners.forEach((listener) => listener())
  },

  subscribe(listener: Listener) {
    this.listeners.add(listener)
    return () => this.listeners.delete(listener)
  },
}

function useMenuStore() {
  const state = useSyncExternalStore(
    store.subscribe.bind(store),
    store.getState.bind(store),
  )

  return {
    isOpen: state,
    toggleMenu: () => store.setState(!state),
    openMenu: () => store.setState(true),
    closeMenu: () => store.setState(false),
  }
}

const HeaderRoot = chakra("header", {
  base: {
    bg: "bg",
    position: "sticky",
    top: "0",
    display: "flex",
    justifyContent: "center",
    width: "100%",
    minHeight: "64px",
    borderBottom: "1px solid",
    borderColor: "border.muted",
    zIndex: "10",
  },
})

const TopNavLink = chakra(Link, {
  base: {
    fontSize: "sm",
    color: "fg.muted",
    _currentPage: {
      color: "fg",
      fontWeight: "medium",
    },
    _hover: {
      color: "fg",
    },
  },
  variants: {
    variant: {
      tab: {
        py: "2",
        borderBottomWidth: "2px",
        borderColor: "transparent",
        transition: "border-color 0.2s",
        _hover: { borderColor: "border" },
        _currentPage: { borderColor: "fg!" },
      },
    },
  },
})

const TopNavMobileLink = chakra(Link, {
  base: {
    display: "block",
    py: "2",
    px: "4",
    color: "fg.muted",
    w: "full",
    _currentPage: {
      color: "fg",
      fontWeight: "medium",
    },
    _hover: {
      color: "fg",
    },
  },
})

const HeaderLogoLink = () => {
  return (
    <Link href="/" aria-label="Chakra UI, Back to homepage">
      <Logo />
    </Link>
  )
}

const HeaderPrimaryNavbarLinks = () => {
  const items = usePrimaryNavItems()
  return (
    <HStack gap="8" minH="48px" aria-label="primary navigation">
      <HeaderLogoLink />
      {items.map((item) => (
        <TopNavLink
          key={item.title}
          href={item.url || "#"}
          aria-current={item.current ? "page" : undefined}
        >
          {item.title}
        </TopNavLink>
      ))}
    </HStack>
  )
}

const HeaderSecondaryNavbarLinks = () => {
  const items = useSecondaryNavItems()
  return (
    <HStack as="nav" gap="6" aria-label="secondary navigation">
      {items.map((item) => (
        <TopNavLink
          key={item.title}
          variant="tab"
          href={item.url || "#"}
          aria-current={item.current ? "page" : undefined}
        >
          {item.title}
        </TopNavLink>
      ))}
    </HStack>
  )
}

interface HeaderVersionMenuProps {
  containerRef?: React.RefObject<HTMLElement>
}

const HeaderVersionMenu = ({ containerRef }: HeaderVersionMenuProps) => (
  <VersionMenu
    items={[
      { title: "v3", value: "3.1.0", url: "/v3" },
      { title: "v2", value: "2.8.x", url: "/v2" },
      { title: "v1", value: "1.5.x", url: "/v1" },
    ]}
    containerRef={containerRef}
  />
)

const HeaderSocialLinks = () => (
  <SocialLinks items={[{ type: "github", href: "#" }]} />
)

const HeaderMobileMenuButton = () => {
  const { isOpen, toggleMenu } = useMenuStore()
  return (
    <IconButton
      variant="ghost"
      size="sm"
      onClick={() => {
        console.log("toggle menu")
        toggleMenu()
      }}
    >
      <AiOutlineMenu />
    </IconButton>
  )
}

const HeaderMobileMenuDropdown = () => {
  const { isOpen, closeMenu, toggleMenu } = useMenuStore()
  const primaryNavItems = usePrimaryNavItems()
  const secondaryNavItems = useSecondaryNavItems()
  const containerRef = useRef(null)

  return (
    <Drawer.Root
      open={isOpen}
      placement="bottom"
      onPointerDownOutside={closeMenu}
      onEscapeKeyDown={closeMenu}
      onOpenChange={toggleMenu}
    >
      <Portal>
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content ref={containerRef} borderTopRadius="md">
            <Drawer.CloseTrigger asChild>
              <IconButton size="sm" variant="ghost">
                <AiOutlineClose />
              </IconButton>
            </Drawer.CloseTrigger>
            <Drawer.Body
              display="flex"
              flexDir="column"
              gap="10"
              py="5"
              flex="1"
            >
              <VStack align="start" justify="stretch">
                {primaryNavItems.map((item) => (
                  <TopNavMobileLink
                    key={item.title}
                    href={item.url || "#"}
                    aria-current={item.current ? "page" : undefined}
                  >
                    {item.title}
                  </TopNavMobileLink>
                ))}
              </VStack>
              <VStack align="start" justify="stretch">
                {secondaryNavItems.map((item) => (
                  <TopNavMobileLink
                    key={item.title}
                    href={item.url || "#"}
                    aria-current={item.current ? "page" : undefined}
                  >
                    {item.title}
                  </TopNavMobileLink>
                ))}
              </VStack>
            </Drawer.Body>
            <Drawer.Footer
              py="2"
              justifyContent="space-between"
              borderTop="1px solid"
              borderColor="border.muted"
            >
              <HeaderVersionMenu containerRef={containerRef} />
              <HeaderSocialLinks />
            </Drawer.Footer>
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  )
}

const HeaderDesktopActions = () => {
  return (
    <HStack gap="2" minH="48px" flexShrink="1" minW="0">
      <HeaderVersionMenu />
      <SearchButton width="256px" size="sm" flexShrink="1" />
      <HeaderSocialLinks />
      <ColorModeButton />
    </HStack>
  )
}

const HeaderMobileActions = () => {
  return (
    <HStack>
      <MobileSearchButton />
      <ColorModeButton />
      <HeaderMobileMenuButton />
    </HStack>
  )
}

const HeaderDesktopNavbar = () => {
  return (
    <Box hideBelow="md">
      <HStack pt="2" pb="2">
        <HeaderPrimaryNavbarLinks />
        <Spacer />
        <HeaderDesktopActions />
      </HStack>

      <HeaderSecondaryNavbarLinks />
    </Box>
  )
}

const HeaderMobileNavbar = () => {
  return (
    <HStack hideFrom="md" h="full">
      <HeaderLogoLink />
      <Spacer />
      <HeaderMobileActions />
    </HStack>
  )
}

export const Header = () => {
  return (
    <>
      <HeaderRoot>
        <Container as="nav">
          <HeaderDesktopNavbar />
          <HeaderMobileNavbar />
        </Container>
      </HeaderRoot>
      <HeaderMobileMenuDropdown />
    </>
  )
}
