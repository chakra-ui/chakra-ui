"use client"

import { ColorModeButton } from "@/components/color-mode-button"
import { Logo } from "@/components/logo"
import { SocialLinks } from "@/components/social-links"
import {
  Button,
  Container,
  Group,
  HStack,
  Spacer,
  chakra,
} from "@chakra-ui/react"
import Link from "next/link"

const HeaderRoot = chakra("div", {
  base: {
    pt: "2",
    display: "flex",
    justifyContent: "center",
    width: "100%",
    minHeight: "64px",
    zIndex: "10",
  },
})

const NavLink = chakra(Link, {
  base: {
    fontWeight: "bold",
    fontSize: "sm",
    color: "fg.subtle",
    _hover: {
      color: "fg",
    },
  },
})

export const Header = () => {
  return (
    <HeaderRoot>
      <Container>
        <HStack pt="2" pb="2" gap="4">
          <Link href="/">
            <Logo color="fg" />
          </Link>

          <Group
            rounded="full"
            border="1px solid"
            borderColor="border.muted"
            p="1"
          >
            <Button
              asChild
              colorPalette="teal"
              size="xs"
              rounded="full"
              bg="teal.500"
              color="black"
            >
              <Link href="/docs/get-started/overview/installation">
                Open Source
              </Link>
            </Button>
            <Button asChild variant="ghost" size="xs" rounded="full">
              <Link href="">Chakra Pro</Link>
            </Button>
          </Group>
          <Spacer />
          <HStack gap="8" minH="48px" as="nav" aria-label="primary navigation">
            {[
              { title: "Docs", url: "" },
              { title: "Examples", url: "" },
              { title: "Showcase", url: "" },
              { title: "Figma Kit", url: "" },
              { title: "Sponsor", url: "" },
            ].map((item) => (
              <NavLink key={item.title} href={item.url}>
                {item.title}
              </NavLink>
            ))}
            <HStack gap="2" minH="48px">
              <SocialLinks items={[{ type: "github", href: "#" }]} />
              <ColorModeButton />
            </HStack>
          </HStack>
        </HStack>
      </Container>
    </HeaderRoot>
  )
}
