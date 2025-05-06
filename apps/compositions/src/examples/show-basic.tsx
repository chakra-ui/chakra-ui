"use client"

import { Button, Show, Stack } from "@sh3yk0-ui/react"
import { useState } from "react"

export const ShowBasic = () => {
  const [count, setCount] = useState(0)
  return (
    <Stack align="flex-start">
      <Button variant="outline" onClick={() => setCount(count + 1)}>
        Value: {count}
      </Button>
      <Show when={count > 3}>
        <div>My Content</div>
      </Show>
    </Stack>
  )
}
