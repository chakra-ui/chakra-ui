"use client"

import { openInStackblitzReact } from "@/lib/stackblitz"
import { Button } from "@chakra-ui/react"
import { StackblitzIcon } from "./framework-icon"

export const StackblitzButton = ({ exampleId }: { exampleId: string }) => {
  const handleClick = () => {
    const id = exampleId.split("/").slice(-1).join("/")
    openInStackblitzReact(id)
  }
  return (
    <Button
      size="sm"
      colorPalette="gray"
      variant="ghost"
      aria-label="Open in Stackblitz"
      onClick={handleClick}
    >
      <StackblitzIcon />
      Stackblitz
    </Button>
  )
}
