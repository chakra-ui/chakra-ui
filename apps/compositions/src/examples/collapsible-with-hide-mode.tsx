"use client"

import {
  Box,
  Button,
  Collapsible,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react"
import { useEffect, useState } from "react"

export const CollapsibleWithHideMode = () => {
  return (
    <Stack gap="4" width="full">
      <Text color="fg.muted" textStyle="sm">
        Collapse both panels for a few seconds, then reopen them to compare the
        effect counters.
      </Text>
      <SimpleGrid columns={{ base: 1, md: 2 }} gap="6">
        <HideModeDemo mode="display-none" />
        <HideModeDemo mode="activity" />
      </SimpleGrid>
    </Stack>
  )
}

const HideModeDemo = (props: { mode: "display-none" | "activity" }) => (
  <Collapsible.Root defaultOpen hideMode={props.mode}>
    <Stack align="flex-start" gap="3">
      <Text fontWeight="medium">hideMode=&quot;{props.mode}&quot;</Text>
      <Collapsible.Trigger asChild>
        <Button size="sm" variant="outline">
          Toggle content
        </Button>
      </Collapsible.Trigger>
      <Collapsible.Content width="full">
        <Box borderWidth="1px" borderRadius="md" p="4">
          <EffectCounter />
        </Box>
      </Collapsible.Content>
    </Stack>
  </Collapsible.Root>
)

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
