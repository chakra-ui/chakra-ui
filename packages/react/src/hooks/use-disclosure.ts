"use client"

import { useCallback, useState } from "react"
import { useCallbackRef } from "./use-callback-ref"

export interface UseDisclosureProps {
  open?: boolean
  defaultOpen?: boolean
  onClose?(): void
  onOpen?(): void
}

/**
 * `useDisclosure` is a custom hook used to help handle common open, close, or toggle scenarios.
 * It can be used to control feedback component such as `Modal`, `AlertDialog`, `Drawer`, etc.
 *
 * @see Docs https://chakra-ui.com/docs/hooks/use-disclosure
 */
export function useDisclosure(props: UseDisclosureProps = {}) {
  const handleOpen = useCallbackRef(props.onOpen)
  const handleClose = useCallbackRef(props.onClose)

  const [openState, setOpen] = useState(props.defaultOpen || false)

  const open = props.open !== undefined ? props.open : openState
  const controlled = props.open !== undefined

  const onClose = useCallback(() => {
    if (!controlled) setOpen(false)
    handleClose?.()
  }, [controlled, handleClose])

  const onOpen = useCallback(() => {
    if (!controlled) setOpen(true)
    handleOpen?.()
  }, [controlled, handleOpen])

  const onToggle = useCallback(() => {
    if (open) {
      onClose()
    } else {
      onOpen()
    }
  }, [open, onOpen, onClose])

  return {
    open,
    onOpen,
    onClose,
    onToggle,
    setOpen,
  }
}

export type UseDisclosureReturn = ReturnType<typeof useDisclosure>
