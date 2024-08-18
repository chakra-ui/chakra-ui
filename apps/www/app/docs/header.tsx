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
  Flex,
  HStack,
  IconButton,
  Spacer,
  VStack,
  chakra,
} from "@chakra-ui/react"
import Link from "next/link"
import { useSyncExternalStore } from "react"
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

const HeaderVersionMenu = () => (
  <VersionMenu
    items={[
      { title: "v3", value: "3.1.0", url: "/v3" },
      { title: "v2", value: "2.8.x", url: "/v2" },
      { title: "v1", value: "1.5.x", url: "/v1" },
    ]}
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
      {isOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
    </IconButton>
  )
}

const HeaderMobileMenuDropdown = () => {
  const { isOpen } = useMenuStore()
  const primaryNavItems = usePrimaryNavItems()
  const secondaryNavItems = useSecondaryNavItems()

  return (
    <Box
      zIndex="modal"
      position="sticky"
      top="var(--header-height)"
      hideFrom="md"
    >
      <Flex
        flexDir="column"
        w="100vw"
        bg="bg"
        position="absolute"
        inset="0"
        overflowY="scroll"
        h="var(--content-height)"
        aria-expanded={isOpen}
        display="none"
        _expanded={{ display: "flex" }}
      >
        <Container display="flex" flexDir="column" gap="10" flex="1">
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
        </Container>

        <Container
          display="flex"
          py="2"
          justifyContent="space-between"
          borderTop="1px solid"
          borderColor="border.muted"
          position="sticky"
          bottom="0"
        >
          <HeaderVersionMenu />
          <HeaderSocialLinks />
        </Container>
      </Flex>
    </Box>
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
