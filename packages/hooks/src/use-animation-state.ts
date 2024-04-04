"use client"

import { getOwnerWindow } from "@chakra-ui/utils"
import { useEffect, useState } from "react"
import { useEventListener } from "./use-event-listener"

export interface UseAnimationStateProps {
  open: boolean
  ref: React.RefObject<HTMLElement>
}

export function useAnimationState(props: UseAnimationStateProps) {
  const { open, ref } = props

  const [mounted, setMounted] = useState(open)
  const [once, setOnce] = useState(false)

  useEffect(() => {
    if (!once) {
      setMounted(open)
      setOnce(true)
    }
  }, [open, once, mounted])

  useEventListener(
    () => ref.current,
    "animationend",
    () => {
      setMounted(open)
    },
  )

  const hidden = open ? false : !mounted

  return {
    present: !hidden,
    onComplete() {
      const win = getOwnerWindow(ref.current)
      const evt = new win.CustomEvent("animationend", { bubbles: true })
      ref.current?.dispatchEvent(evt)
    },
  }
}

export type UseAnimationStateReturn = ReturnType<typeof useAnimationState>
