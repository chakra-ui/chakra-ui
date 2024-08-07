"use client"

import { Button, Show, Stack, Text } from "@chakra-ui/react"
import { useState } from "react"

export const ShowWithFallback = () => {
  const [count, setCount] = useState(0)
  return (
    <Stack align="flex-start">
      <Show
        when={count > 3}
        fallback={<Text>Not there yet. Keep clicking...</Text>}
      >
        <div>Congrats! I'm here</div>
      </Show>
      <Button variant="outline" onClick={() => setCount(count + 1)}>
        Value: {count}
      </Button>
    </Stack>
  )
}
