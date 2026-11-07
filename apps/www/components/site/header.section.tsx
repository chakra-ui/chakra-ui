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
  chakra,
} from "@chakra-ui/react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { type Ref, useRef } from "react"
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai"

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

const MobileNavContent = () => {
  const pathname = usePathname()
  return (
    <Container pb="6">
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
      <Box borderTopWidth="1px" pt="4">
        <Box ms="-2">
          <SocialLinks items={[{ type: "github", href: docsConfig.repoUrl }]} />
        </Box>
      </Box>
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
