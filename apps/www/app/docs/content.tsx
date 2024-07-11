"use client"

import { BackToTop } from "@/components/back-to-top"
import { PageHeader } from "@/components/page-header"
import { SideNav } from "@/components/sidenav"
import { Toc } from "@/components/toc"
import { NavUtil } from "@/lib/nav-util"
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
      width="16rem"
      hideBelow="md"
      fontSize="sm"
    >
      <Stack gap="10">
        {NavUtil.getSidebarNavItems()?.map((group) => (
          <SideNav
            key={group.label}
            currentHref={NavUtil.currentHref}
            label={group.label}
            items={group.items}
          />
        ))}
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
      width="16rem"
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

const Body = (props: React.PropsWithChildren) => {
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
        links={[
          { label: "Source", href: "#" },
          { label: "Recipe", href: "#" },
          { label: "Storybook", href: "#" },
        ]}
      />
      {props.children}
    </Stack>
  )
}

export const Content = (props: React.PropsWithChildren) => {
  return (
    <Container pt="var(--header-height)" minHeight="var(--content-height)">
      <Flex>
        <SidebarStart />
        <Body>{props.children}</Body>
        <SidebarEnd />
      </Flex>
    </Container>
  )
}
