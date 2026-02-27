"use client"

import { ClientOnly, Skeleton, Stack, Text } from "@chakra-ui/react"
import { useEffect, useState } from "react"

function Clock() {
  const [time, setTime] = useState(() => new Date().toLocaleTimeString())

  useEffect(() => {
    const interval = window.setInterval(() => {
      setTime(new Date().toLocaleTimeString())
    }, 1000)

    return () => window.clearInterval(interval)
  }, [])

  return <Text>Current time: {time}</Text>
}

export const ClientOnlyWithFallback = () => {
  return (
    <ClientOnly fallback={<Skeleton height="5" width="32" />}>
      <Stack gap="1">
        <Text fontWeight="medium">Client clock</Text>
        <Clock />
      </Stack>
    </ClientOnly>
  )
}
