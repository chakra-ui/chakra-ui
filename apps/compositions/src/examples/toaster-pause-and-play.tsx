"use client"

import { Button, HStack } from "@chakra-ui/react"
import { toaster } from "compositions/ui/toaster"
import { useId, useState } from "react"
import { HiPause, HiPlay } from "react-icons/hi"

export const ToasterPauseAndPlay = () => {
  const id = useId()
  const [paused, setPaused] = useState(false)

  const show = () => {
    toaster.success({ id, title: "This is a success toast" })
  }

  const pause = () => {
    toaster.pause(id)
    setPaused(true)
  }

  const play = () => {
    toaster.resume(id)
    setPaused(false)
  }

  return (
    <HStack>
      <Button variant="outline" size="sm" onClick={show}>
        Show Toast
      </Button>
      <Button variant="outline" size="sm" onClick={pause} disabled={!paused}>
        <HiPause />
        Pause Toast
      </Button>
      <Button variant="outline" size="sm" onClick={play} disabled={paused}>
        <HiPlay />
        Play Toast
      </Button>
    </HStack>
  )
}
