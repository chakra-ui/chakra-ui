"use client"

import { ClientOnly, Code, Skeleton, Stack, Text } from "@chakra-ui/react"

export const ClientOnlyRenderProp = () => {
  return (
    <ClientOnly fallback={<Skeleton height="12" width="full" maxW="sm" />}>
      {() => (
        <Stack align="flex-start" gap="1" textStyle="sm">
          <Text>
            Current URL: <Code>{window.location.href}</Code>
          </Text>
          <Text>
            Screen width: <Code>{window.innerWidth}px</Code>
          </Text>
        </Stack>
      )}
    </ClientOnly>
  )
}
