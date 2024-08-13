"use client"

import { Button } from "@chakra-ui/react"
import { toaster } from "compositions/ui/toaster"

export const ToasterWithPromise = () => {
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => {
        const promise = new Promise<void>((resolve) => {
          setTimeout(() => resolve(), 5000)
        })

        toaster.promise(promise, {
          success: {
            title: "Successfully uploaded!",
            description: "Looks great",
          },
          error: {
            title: "Upload failed",
            description: "Something wrong with the upload",
          },
          loading: { title: "Uploading...", description: "Please wait" },
        })
      }}
    >
      Show Toast
    </Button>
  )
}
