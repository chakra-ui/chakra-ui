import { getOwnerWindow } from "@chakra-ui/utils"
import { RefObject, useEffect, useState } from "react"
import { useEventListener } from "./use-event-listener"

export type UseAnimationStateProps = {
  isOpen: boolean
  ref: RefObject<HTMLElement>
}

export function useAnimationState(props: UseAnimationStateProps) {
  const { isOpen, ref } = props

  const [mounted, setMounted] = useState(isOpen)
  const [once, setOnce] = useState(false)

  useEffect(() => {
    if (!once) {
      setMounted(isOpen)
      setOnce(true)
    }
  }, [isOpen, once, mounted])

  useEventListener(
    "animationend",
    () => {
      setMounted(isOpen)
    },
    () => ref.current,
  )

  const hidden = isOpen ? false : !mounted && once

  return {
    present: !hidden,
    onComplete() {
      const win = getOwnerWindow(ref.current)
      const evt = new win.CustomEvent("animationend", { bubbles: true })
      ref.current?.dispatchEvent(evt)
    },
  }
}
