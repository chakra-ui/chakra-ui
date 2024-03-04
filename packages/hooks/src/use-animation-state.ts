import { getOwnerWindow } from "@chakra-ui/utils"
import { useEffect, useState } from "react"
import { useEventListener } from "./use-event-listener"

export interface UseAnimationStateProps {
  isOpen: boolean
  ref: React.RefObject<HTMLElement>
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
    () => ref.current,
    "animationend",
    () => {
      setMounted(isOpen)
    },
  )

  const hidden = isOpen ? false : !mounted

  return {
    present: !hidden,
    onComplete() {
      const win = getOwnerWindow(ref.current)
      const evt = new win.CustomEvent("animationend", { bubbles: true })
      ref.current?.dispatchEvent(evt)
    },
  }
}
