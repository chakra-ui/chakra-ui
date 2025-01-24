"use client"

import { ColorModeButton } from "@/components/docs/color-mode-button"
import { Logo } from "@/components/logo"
import { MobileSearchButton, SearchButton } from "@/components/search-button"
import { SocialLinks } from "@/components/social-links"
import { VersionMenu } from "@/components/version-menu"
import { docsConfig } from "@/docs.config"
import { useRoute } from "@/lib/use-route"
import {
  Box,
  Container,
  HStack,
  IconButton,
  Portal,
  Spacer,
  VStack,
  chakra,
} from "@chakra-ui/react"
import packageJson from "@chakra-ui/react/package.json"
import {
  DrawerBackdrop,
  DrawerBody,
  DrawerCloseTrigger,
  DrawerContent,
  DrawerFooter,
  DrawerRoot,
  DrawerTrigger,
} from "compositions/ui/drawer"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai"
import { SponsorButton } from "../sponsor-button"
import { CommandMenu } from "./command-menu"

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
        _currentPage: { borderColor: "teal.solid!" },
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

const HeaderPrimaryNavbar = () => {
  const route = useRoute()
  const items = route.getPrimaryNavItems()
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

const HeaderSecondaryNavbar = () => {
  const route = useRoute()
  const items = route.getSecondaryNavItems()
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
      { title: "v3", value: packageJson.version, url: "#" },
      { title: "v2", value: "2.10.x", url: "https://v2.chakra-ui.com" },
      { title: "v1", value: "1.5.x", url: "https://v1.chakra-ui.com" },
    ]}
    portalRef={containerRef}
  />
)

const HeaderSocialLinks = () => (
  <SocialLinks items={[{ type: "github", href: docsConfig.repoUrl }]} />
)

const HeaderMobileMenuDropdown = () => {
  const [isOpen, setIsOpen] = useState(false)
  const closeMenu = () => setIsOpen(false)

  const route = useRoute()
  const primaryNavItems = route.getPrimaryNavItems()
  const secondaryNavItems = route.getSecondaryNavItems()

  const containerRef = useRef(null)
  const pathname = usePathname()
  const pathnameRef = useRef(pathname)

  useEffect(() => {
    if (pathnameRef.current !== pathname) {
      setIsOpen(false)
    }
    pathnameRef.current = pathname
  }, [pathname, setIsOpen])

  return (
    <DrawerRoot
      open={isOpen}
      placement="bottom"
      onPointerDownOutside={closeMenu}
      onEscapeKeyDown={closeMenu}
      onOpenChange={(e) => setIsOpen(e.open)}
    >
      <DrawerTrigger asChild>
        <IconButton variant="ghost" size="sm">
          <AiOutlineMenu />
        </IconButton>
      </DrawerTrigger>
      <Portal>
        <DrawerBackdrop />
        <DrawerContent borderTopRadius="md" maxH="var(--content-height)">
          <DrawerCloseTrigger asChild>
            <IconButton size="sm" variant="ghost">
              <AiOutlineClose />
            </IconButton>
          </DrawerCloseTrigger>
          <DrawerBody display="flex" flexDir="column" gap="10" py="5" flex="1">
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
          </DrawerBody>
          <DrawerFooter
            py="2"
            justifyContent="space-between"
            borderTop="1px solid"
            borderColor="border"
            ref={containerRef}
          >
            <HeaderVersionMenu containerRef={containerRef} />
            <HeaderSocialLinks />
          </DrawerFooter>
        </DrawerContent>
      </Portal>
    </DrawerRoot>
  )
}

const HeaderDesktopActions = () => {
  return (
    <HStack gap="2" minH="48px" flexShrink="1" minW="0">
      <SponsorButton hideBelow="lg" />
      <HeaderVersionMenu />
      <CommandMenu
        trigger={<SearchButton width="256px" size="sm" flexShrink="1" />}
      />
      <HeaderSocialLinks />
      <ColorModeButton />
    </HStack>
  )
}

const HeaderMobileActions = () => {
  return (
    <HStack>
      <CommandMenu trigger={<MobileSearchButton />} disableHotkey />
      <ColorModeButton />
      <HeaderMobileMenuDropdown />
    </HStack>
  )
}

const HeaderDesktopNavbar = () => {
  return (
    <Box hideBelow="md">
      <HStack py="2">
        <HeaderPrimaryNavbar />
        <Spacer />
        <HeaderDesktopActions />
      </HStack>
      <HeaderSecondaryNavbar />
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
    <HeaderRoot>
      <Container>
        <HeaderDesktopNavbar />
        <HeaderMobileNavbar />
      </Container>
    </HeaderRoot>
  )
}
