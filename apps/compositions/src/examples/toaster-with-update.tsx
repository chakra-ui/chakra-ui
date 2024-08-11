"use client"

import { Button, HStack } from "@chakra-ui/react"
import { toaster } from "compositions/ui/toaster"

export const ToasterWithUpdate = () => {
  const id = "login-error-toast"

  const show = () => {
    if (toaster.isVisible(id)) return
    toaster.loading({
      id,
      title: "Error Connecting...",
      description: "You do not have permissions to perform this action.",
    })
  }

  const update = () => {
    toaster.update(id, {
      title: "Hooray 🥳🥳🥳!!!",
      description: "You now have permissions to perform this action.",
      type: "success",
      duration: 3000,
    })
  }

  return (
    <HStack>
      <Button variant="outline" size="sm" onClick={show}>
        Show Toast
      </Button>
      <Button variant="outline" size="sm" onClick={update}>
        Update Toast
      </Button>
    </HStack>
  )
}
