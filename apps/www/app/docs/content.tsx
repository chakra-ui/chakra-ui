"use client"

import { BackToTop } from "@/components/back-to-top"
import { PageHeader } from "@/components/page-header"
import { SideNav } from "@/components/sidenav"
import { Toc } from "@/components/toc"
import { Box, Container, Flex, Stack } from "@chakra-ui/react"

const SidebarStart = () => {
  return (
    <Box
      as="aside"
      position="sticky"
      pe="5"
      ms="-3"
      py="8"
      flexShrink="0"
      height="var(--content-height)"
      overflowY="auto"
      width="320px"
      hideBelow="md"
      fontSize="sm"
    >
      <Stack gap="10">
        <SideNav
          maxW="80%"
          currentHref="/quickstart"
          label="Getting Started"
          items={[
            { label: "Quick Start", href: "/quickstart" },
            { label: "Installation", href: "/installation" },
            { label: "Changelog", href: "/changelog", status: "new" },
            { label: "Upgrade to v3", href: "/upgrade-to-v3" },
            { label: "Contributing", href: "/contributing" },
          ]}
        />
        <SideNav
          maxW="80%"
          label="Frameworks"
          items={[
            { label: "Next.js (App)", href: "/next-js-app" },
            { label: "Next.js (Page)", href: "/next-js-pages" },
            { label: "Remix", href: "/remix" },
            { label: "Gatsby", href: "/gatsby" },
            { label: "Vite", href: "/vite" },
            { label: "Storybook", href: "/storybook" },
            { label: "Redwood", href: "/redwood" },
          ]}
        />
      </Stack>
    </Box>
  )
}

const SidebarEnd = () => {
  return (
    <Box
      as="aside"
      position="sticky"
      pt="8"
      px="2"
      flexShrink="0"
      height="var(--content-height)"
      overflowY="auto"
      width="256px"
      hideBelow="xl"
    >
      <Stack gap="4" align="flex-start">
        <Toc
          items={[
            { label: "How to install", href: "#", depth: 0 },
            { label: "Setup Provider", href: "#", depth: 0 },
            { label: "Install CLI (optional)", href: "#", depth: 0 },
            { label: "Add Compositions", href: "#", depth: 1 },
          ]}
        />
        <BackToTop />
      </Stack>
    </Box>
  )
}

const Body = () => {
  return (
    <Stack
      flex="1"
      width="full"
      px={{ md: "12" }}
      pt="10"
      pb="16"
      minHeight="var(--content-height)"
    >
      <span id="scroll-to-top" />
      <PageHeader
        title="Quick Start"
        description="Learn how to get started with Chakra UI"
      />
    </Stack>
  )
}

export const Content = () => {
  return (
    <Container pt="var(--header-height)" minHeight="var(--content-height)">
      <Flex>
        <SidebarStart />
        <Body />
        <SidebarEnd />
      </Flex>
    </Container>
  )
}
