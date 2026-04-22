"use client"

import { Box, Flex, HStack, Stack } from "@chakra-ui/react"
import type { ReactNode } from "react"

interface TourAppShellProps {
  logo?: ReactNode
  search?: ReactNode
  actions?: ReactNode
  sidebar?: ReactNode
  children: ReactNode
}

export const TourAppShell = (props: TourAppShellProps) => {
  const { logo, search, actions, sidebar, children } = props
  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      bg="bg.panel"
      minH="480px"
    >
      <Flex
        as="header"
        align="center"
        justify="space-between"
        px="4"
        py="2.5"
        borderBottomWidth="1px"
        gap="4"
      >
        <HStack gap="3" minW="0">
          {logo}
        </HStack>
        {search && (
          <Box flex="1" maxW="360px">
            {search}
          </Box>
        )}
        <HStack gap="2">{actions}</HStack>
      </Flex>
      <Flex minH="420px">
        {sidebar && (
          <Stack
            as="nav"
            gap="1"
            w="220px"
            p="3"
            borderRightWidth="1px"
            flexShrink="0"
          >
            {sidebar}
          </Stack>
        )}
        <Box flex="1" p="4" minW="0">
          {children}
        </Box>
      </Flex>
    </Box>
  )
}
