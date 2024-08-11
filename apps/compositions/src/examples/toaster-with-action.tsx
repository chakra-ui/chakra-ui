"use client"

import { Button } from "@chakra-ui/react"
import { toaster } from "compositions/ui/toaster"

export const ToasterWithAction = () => {
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() =>
        toaster.success({
          title: "Update successful",
          description: "File saved successfully to the server",
          meta: {
            closable: false,
            actionLabel: "Undo",
            action: () => console.log("Undo"),
          },
        })
      }
    >
      Click me
    </Button>
  )
}
