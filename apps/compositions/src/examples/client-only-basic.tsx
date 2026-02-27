"use client"

import { ClientOnly, Text } from "@chakra-ui/react"

export const ClientOnlyBasic = () => {
  return (
    <ClientOnly>
      <Text>This content is rendered only on the client.</Text>
    </ClientOnly>
  )
}
