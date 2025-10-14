"use client"

import { HoverCard, Link, Portal, Stack, Text } from "@chakra-ui/react"

export const HoverCardWithDisabled = () => {
  return (
    <HoverCard.Root size="sm" disabled>
      <HoverCard.Trigger asChild>
        <Link href="#">@chakra_ui</Link>
      </HoverCard.Trigger>
      <Portal>
        <HoverCard.Positioner>
          <HoverCard.Content>
            <HoverCard.Arrow />
            <Stack gap="1">
              <Text textStyle="sm" fontWeight="semibold">
                Chakra UI
              </Text>
              <Text textStyle="sm" color="fg.muted">
                The most powerful toolkit for building modern web applications.
              </Text>
            </Stack>
          </HoverCard.Content>
        </HoverCard.Positioner>
      </Portal>
    </HoverCard.Root>
  )
}
