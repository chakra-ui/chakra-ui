"use client"

import { ColorModeButton } from "@/components/docs/color-mode-button"
import { Logo } from "@/components/logo"
import { SocialLinks } from "@/components/social-links"
import { NAV_LINKS, docsConfig } from "@/docs.config"
import {
  Box,
  Container,
  Dialog,
  HStack,
  IconButton,
  Spacer,
  Stack,
  Text,
  chakra,
} from "@chakra-ui/react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { type Ref, useRef } from "react"
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai"
import { LuArrowUpRight } from "react-icons/lu"

const HeaderRoot = chakra(Container, {
  base: {
    minH: "64px",
    display: "flex",
    flexDir: "row",
    alignItems: "center",
    gap: { base: "1", md: "4" },
  },
})

const LogoLink = () => (
  <HStack asChild focusRing="outside">
    <Link href="/" aria-label="Chakra UI, Back to homepage">
      <Logo color="fg" />
    </Link>
  </HStack>
)

const DesktopNav = () => (
  <HStack gap="2" as="nav" aria-label="primary navigation">
    <HStack gap="3" minH="48px" display={{ base: "none", md: "flex" }}>
      {NAV_LINKS.map((item) => (
        <HStack
          minH="8"
          px="3"
          rounded="md"
          focusRing="outside"
          asChild
          fontWeight="medium"
          textStyle="sm"
          key={item.title}
        >
          <Link href={item.url}>{item.title}</Link>
        </HStack>
      ))}
      <SocialLinks items={[{ type: "github", href: docsConfig.repoUrl }]} />
    </HStack>
    <ColorModeButton />
  </HStack>
)

const MobileNavTrigger = () => (
  <Dialog.Trigger asChild>
    <IconButton
      display={{ base: "flex", md: "none" }}
      aria-label="Open menu"
      fontSize="md"
      color="fg"
      variant="ghost"
    >
      <AiOutlineMenu />
    </IconButton>
  </Dialog.Trigger>
)

const MobileNavCloseTrigger = (props: { ref: Ref<HTMLButtonElement> }) => (
  <Dialog.CloseTrigger asChild pos="inherit" inset="0">
    <IconButton
      ref={props.ref}
      aria-label="Close menu"
      fontSize="md"
      color="fg"
      variant="ghost"
    >
      <AiOutlineClose />
    </IconButton>
  </Dialog.CloseTrigger>
)

const projectLinks = [
  {
    title: "Chakra UI Pro",
    description: "Ready-made components and templates",
    url: "https://pro.chakra-ui.com",
  },
  {
    title: "Ark UI",
    description: "Headless components for any JS framework",
    url: "https://ark-ui.com",
  },
  {
    title: "Zag.js",
    description: "State machines for UI components",
    url: "https://zagjs.com",
  },
  {
    title: "Panda CSS",
    description: "Build-time, type-safe CSS-in-JS",
    url: "https://panda-css.com",
  },
  {
    title: "FigPilot",
    description: "Convert Figma designs to Chakra UI components",
    url: "https://figma.chakra-ui.com",
  },
]

const MobileNavContent = () => {
  const pathname = usePathname()
  return (
    <Container flex="1" display="flex" flexDirection="column" pb="6">
      <Stack as="nav" aria-label="primary navigation" gap="0" py="2">
        {NAV_LINKS.map((item) => (
          <Box
            key={item.title}
            asChild
            display="flex"
            alignItems="center"
            minH="12"
            textStyle="xl"
            fontWeight="medium"
            color="fg.muted"
            focusRing="inside"
            _hover={{ color: "fg" }}
            _currentPage={{ color: "fg" }}
          >
            <Link
              href={item.url}
              aria-current={
                pathname.startsWith(`/${item.url.split("/")[1]}`)
                  ? "page"
                  : undefined
              }
            >
              {item.title}
            </Link>
          </Box>
        ))}
      </Stack>
      <Stack
        as="nav"
        aria-label="Chakra projects"
        gap="2"
        mt="6"
        pt="6"
        borderTopWidth="1px"
      >
        <Text
          textStyle="xs"
          fontWeight="medium"
          letterSpacing="wider"
          textTransform="uppercase"
          color="fg.subtle"
        >
          More from Chakra
        </Text>
        <Stack gap="0">
          {projectLinks.map((item) => (
            <HStack
              key={item.title}
              asChild
              gap="4"
              py="2.5"
              focusRing="inside"
              className="group"
            >
              <a href={item.url} target="_blank" rel="noopener noreferrer">
                <Stack gap="0.5" flex="1">
                  <Text textStyle="md" fontWeight="medium">
                    {item.title}
                  </Text>
                  <Text textStyle="sm" color="fg.muted">
                    {item.description}
                  </Text>
                </Stack>
                <Box
                  color="fg.subtle"
                  transition="transform 0.2s, color 0.2s"
                  _groupHover={{
                    color: "fg",
                    transform: "translate(2px, -2px)",
                  }}
                >
                  <LuArrowUpRight aria-hidden />
                </Box>
              </a>
            </HStack>
          ))}
        </Stack>
      </Stack>
      <HStack justify="space-between" mt="auto" pt="4" borderTopWidth="1px">
        <Box ms="-2">
          <SocialLinks
            items={[
              { type: "github", href: docsConfig.repoUrl },
              { type: "discord", href: "https://discord.gg/chakra-ui" },
              { type: "x", href: "https://x.com/chakra_ui" },
            ]}
          />
        </Box>
        <ColorModeButton />
      </HStack>
    </Container>
  )
}

const MobileNav = () => {
  const closeRef = useRef<HTMLButtonElement>(null)
  return (
    <Dialog.Root
      size="full"
      motionPreset="slide-in-top"
      initialFocusEl={() => closeRef.current}
    >
      <MobileNavTrigger />
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content shadow="none" bg="bg">
          <HeaderRoot>
            <LogoLink />
            <Spacer />
            <MobileNavCloseTrigger ref={closeRef} />
          </HeaderRoot>
          <MobileNavContent />
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  )
}

export const HeaderSection = () => {
  return (
    <Container mt="2">
      <HStack>
        <LogoLink />
        <Spacer />
        <DesktopNav />
        <MobileNav />
      </HStack>
    </Container>
  )
}
