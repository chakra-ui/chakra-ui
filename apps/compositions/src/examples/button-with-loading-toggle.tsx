"use client"

import { Button, Checkbox, VStack } from "@sh3yk0-ui/react"
import { useState } from "react"

export const ButtonWithLoadingToggle = () => {
  const [loading, setLoading] = useState(false)
  return (
    <VStack gap="4">
      <Button loading={loading} onClick={() => setLoading(!loading)}>
        Click me
      </Button>
      <Checkbox.Root
        size="sm"
        checked={loading}
        onCheckedChange={() => setLoading(!loading)}
      >
        <Checkbox.HiddenInput />
        <Checkbox.Control />
        <Checkbox.Label>Loading</Checkbox.Label>
      </Checkbox.Root>
    </VStack>
  )
}
