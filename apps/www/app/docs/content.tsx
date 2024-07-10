"use client"

import { Box, Container, Flex, Stack, chakra } from "@chakra-ui/react"

const SidebarStart = () => {
  return (
    <Box
      as="aside"
      position="sticky"
      px="5"
      py="4"
      flexShrink="0"
      height="var(--content-height)"
      overflowY="auto"
      width="320px"
      hideBelow="md"
    >
      SidebarStart
    </Box>
  )
}

const SidebarEnd = () => {
  return (
    <Box
      as="aside"
      position="sticky"
      pt="4"
      flexShrink="0"
      height="var(--content-height)"
      overflowY="auto"
      width="256px"
      hideBelow="xl"
    >
      SidebarEnd
    </Box>
  )
}

const Body = () => {
  return (
    <Stack
      flex="1"
      width="full"
      px={{ md: "12" }}
      pt="6"
      pb="16"
      minHeight="var(--content-height)"
    >
      Main content
    </Stack>
  )
}

export const Content = () => {
  return (
    <Container pt="var(--header-height)" minHeight="var(--content-height)">
      <Flex debug>
        <SidebarStart />
        <Body />
        <SidebarEnd />
      </Flex>
    </Container>
  )
}
