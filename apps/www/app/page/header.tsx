"use client"

import { ColorModeButton } from "@/components/color-mode-button"
import { Logo, LogoIcon } from "@/components/logo"
import { SocialLinks } from "@/components/social-links"
import {
  Box,
  Button,
  Container,
  Dialog,
  Group,
  HStack,
  IconButton,
  Spacer,
  Stack,
  chakra,
} from "@chakra-ui/react"
import Link from "next/link"
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

const LogoSection = () => (
  <Link href="/" aria-label="Chakra UI, Back to homepage">
    <Logo color="red" display={{ base: "none", md: "block" }} />
    <Box minW="3rem" display={{ base: "block", md: "none" }}>
      <LogoIcon />
    </Box>
  </Link>
)

const SectionButtonGroup = () => (
  <Group rounded="full" border="1px solid" borderColor="border.muted" p="1">
    <Button
      asChild
      colorPalette="teal"
      size="xs"
      rounded="full"
      bg="teal.500"
      color="black"
    >
      <Link href="/docs/get-started/overview/installation">Open Source</Link>
    </Button>
    <Button asChild variant="ghost" size="xs" rounded="full">
      <a
        target="_blank"
        rel="noopener"
        href="https://pro.chakra-ui.com/?utm_source=chakra-ui.com&utm_medium=homepage-ad"
      >
        Chakra Pro
      </a>
    </Button>
  </Group>
)

const NAV_LINKS = [
  { title: "Docs", url: "" },
  { title: "Examples", url: "" },
  { title: "Showcase", url: "" },
  { title: "Figma Kit", url: "" },
  { title: "Sponsor", url: "" },
]

const MainNavigation = () => (
  <HStack gap="2" as="nav" aria-label="primary navigation">
    <HStack gap="2" minH="48px" display={{ base: "none", md: "flex" }}>
      {NAV_LINKS.map((item) => (
        <chakra.a
          key={item.title}
          href={item.url}
          fontWeight="bold"
          fontSize="sm"
          color={{ base: "fg.subtle", _hover: "fg" }}
        >
          {item.title}
        </chakra.a>
      ))}
      <SocialLinks items={[{ type: "github", href: "#" }]} />
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

const MobileNavCloseTrigger = () => (
  <Dialog.CloseTrigger asChild pos="inherit" inset="0">
    <IconButton
      aria-label="Close menu"
      fontSize="md"
      color="fg"
      variant="ghost"
    >
      <AiOutlineClose />
    </IconButton>
  </Dialog.CloseTrigger>
)

const MobileNavContent = () => (
  <Container>
    <Stack py="4" gap="4" color="white">
      {NAV_LINKS.map((item) => (
        <Button key={item.title} variant="outline" colorPalette="teal" asChild>
          <Link href={item.url}>{item.title}</Link>
        </Button>
      ))}
    </Stack>
  </Container>
)

const MobileNavigation = () => {
  return (
    <Dialog.Root>
      <MobileNavTrigger />
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content m="0" shadow="none" borderRadius="0" bg="var(--bg)">
          <HeaderRoot>
            <LogoSection />
            <SectionButtonGroup />
            <Spacer />
            <MobileNavCloseTrigger />
          </HeaderRoot>
          <MobileNavContent />
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  )
}

export const Header = () => {
  return (
    <HeaderRoot>
      <LogoSection />
      <SectionButtonGroup />
      <Spacer />
      <MainNavigation />
      <MobileNavigation />
    </HeaderRoot>
  )
}
