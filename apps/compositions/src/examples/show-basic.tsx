"use client"

import { Button, Show, Stack } from "@chakra-ui/react"
import { useState } from "react"

export const ShowBasic = () => {
  const [count, setCount] = useState(0)
  return (
    <Stack align="flex-start">
      <Show when={count > 3}>
        <div>My Content</div>
      </Show>
      <Button variant="outline" onClick={() => setCount(count + 1)}>
        Value: {count}
      </Button>
    </Stack>
  )
}
