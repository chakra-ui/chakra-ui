"use client"

import { ColorModeButton } from "@/components/color-mode-button"
import { Logo } from "@/components/logo"
import { SearchButton } from "@/components/search-button"
import { SocialLinks } from "@/components/social-links"
import { VersionMenu } from "@/components/version-menu"
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
    color: "fg.subtle",
    _currentPage: { color: "fg" },
  },
  variants: {
    variant: {
      tab: {
        py: "2",
        borderBottom: "1px solid",
        borderColor: "transparent",
        transition: "border-color 0.2s",
        _hover: { borderColor: "border" },
        _currentPage: { borderColor: "fg!" },
      },
    },
  },
})

const HeaderPrimaryNav = () => {
  return (
    <HStack gap="8" minH="48px" as="nav" aria-label="primary navigation">
      <Link href="/">
        <Logo />
      </Link>
      <TopNavLink href="/" aria-current="page">
        Docs
      </TopNavLink>
      <TopNavLink href="/">Examples</TopNavLink>
      <TopNavLink href="/">Figma</TopNavLink>
      <TopNavLink href="/">Showcase</TopNavLink>
    </HStack>
  )
}

const HeaderSecondaryNav = () => {
  return (
    <HStack as="nav" gap="6" aria-label="secondary navigation">
      <TopNavLink variant="tab" href="/" aria-current="page">
        Get Started
      </TopNavLink>
      <TopNavLink variant="tab" href="/">
        Design Tokens
      </TopNavLink>
      <TopNavLink variant="tab" href="/">
        Components
      </TopNavLink>
      <TopNavLink variant="tab" href="/">
        Theming
      </TopNavLink>
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
                { label: "v3", value: "3.1.0", href: "/v3" },
                { label: "v2", value: "2.8.x", href: "/v2" },
                { label: "v1", value: "1.5.x", href: "/v1" },
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
