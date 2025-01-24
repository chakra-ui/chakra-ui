"use client"

import { Button, VStack } from "@chakra-ui/react"
import { Checkbox } from "compositions/ui/checkbox"
import { useState } from "react"

export const ButtonWithLoadingToggle = () => {
  const [loading, setLoading] = useState(false)
  return (
    <VStack gap="4">
      <Button loading={loading} onClick={() => setLoading(!loading)}>
        Click me
      </Button>
      <Checkbox
        size="sm"
        checked={loading}
        onCheckedChange={() => setLoading(!loading)}
      >
        Loading
      </Checkbox>
    </VStack>
  )
}
