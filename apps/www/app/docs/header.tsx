"use client"

import { ColorModeButton } from "@/components/color-mode-button"
import { Logo } from "@/components/logo"
import { SearchButton } from "@/components/search-button"
import { SocialLinks } from "@/components/social-links"
import { VersionMenu } from "@/components/version-menu"
import { useRoute } from "@/lib/use-route"
import { Container, HStack, Spacer, chakra } from "@chakra-ui/react"
import Link from "next/link"

const HeaderRoot = chakra("div", {
  base: {
    bg: "bg",
    position: "fixed",
    top: "0",
    display: "flex",
    justifyContent: "center",
    width: "100%",
    minHeight: "64px",
    shadow: "0 1px 0 0 var(--shadow-color)",
    shadowColor: "border.muted",
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

const HeaderPrimaryNav = () => {
  const route = useRoute()
  return (
    <HStack gap="8" minH="48px" as="nav" aria-label="primary navigation">
      <Link href="/">
        <Logo />
      </Link>
      {route.getPrimaryNavItems().map((item) => (
        <TopNavLink
          key={item.title}
          href={item.url!}
          aria-current={item.current ? "page" : undefined}
        >
          {item.title}
        </TopNavLink>
      ))}
    </HStack>
  )
}

const HeaderSecondaryNav = () => {
  const route = useRoute()
  return (
    <HStack as="nav" gap="6" aria-label="secondary navigation">
      {route.getSecondaryNavItems().map((item) => (
        <TopNavLink
          key={item.title}
          variant="tab"
          href={item.url!}
          aria-current={item.current ? "page" : undefined}
        >
          {item.title}
        </TopNavLink>
      ))}
    </HStack>
  )
}

export const Header = () => {
  return (
    <HeaderRoot>
      <Container>
        <HStack pt="2" pb="2">
          <HeaderPrimaryNav />
          <Spacer />
          <HStack gap="2" minH="48px">
            <VersionMenu
              items={[
                { title: "v3", value: "3.1.0", url: "/v3" },
                { title: "v2", value: "2.8.x", url: "/v2" },
                { title: "v1", value: "1.5.x", url: "/v1" },
              ]}
            />
            <SearchButton width="256px" size="sm" />
            <SocialLinks items={[{ type: "github", href: "#" }]} />
            <ColorModeButton />
          </HStack>
        </HStack>
        <HeaderSecondaryNav />
      </Container>
    </HeaderRoot>
  )
}
