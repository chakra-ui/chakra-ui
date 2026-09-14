"use client"

import { Box, Button, Collapsible, Stack, Text } from "@chakra-ui/react"
import { useEffect, useState } from "react"

export const CollapsibleWithHideMode = () => {
  return (
    <Collapsible.Root defaultOpen hideMode="activity">
      <Stack align="flex-start" gap="3">
        <Collapsible.Trigger asChild>
          <Button size="sm" variant="outline">
            Toggle content
          </Button>
        </Collapsible.Trigger>
        <Text color="fg.muted" textStyle="sm">
          Collapse this for a few seconds, then reopen it. The counter pauses
          while collapsed and resumes from where it stopped.
        </Text>
        <Collapsible.Content width="full">
          <Box borderWidth="1px" borderRadius="md" p="4">
            <EffectCounter />
          </Box>
        </Collapsible.Content>
      </Stack>
    </Collapsible.Root>
  )
}

const EffectCounter = () => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const interval = window.setInterval(() => {
      setCount((current) => current + 1)
    }, 1000)

    return () => window.clearInterval(interval)
  }, [])

  return <Text>Effect ticks: {count}</Text>
}
