"use client"

import { Button, HStack } from "@chakra-ui/react"
import { toaster } from "compositions/ui/toaster"

export const ToasterWithExternalClose = () => {
  return (
    <HStack>
      <Button
        variant="outline"
        size="sm"
        onClick={() =>
          toaster.create({
            description: "File saved successfully",
            type: "info",
          })
        }
      >
        Show Toast
      </Button>

      <Button variant="outline" size="sm" onClick={() => toaster.dismiss()}>
        Close Toasts
      </Button>
    </HStack>
  )
}
