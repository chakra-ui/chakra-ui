"use client"

import React, { useCallback, useId, useState } from "react"
import { useCallbackRef } from "./use-callback-ref"

export interface UseDisclosureProps {
  open?: boolean
  defaultOpen?: boolean
  onClose?(): void
  onOpen?(): void
  id?: string
}

type HTMLProps = React.HTMLAttributes<HTMLElement>

/**
 * `useDisclosure` is a custom hook used to help handle common open, close, or toggle scenarios.
 * It can be used to control feedback component such as `Modal`, `AlertDialog`, `Drawer`, etc.
 *
 * @see Docs https://chakra-ui.com/docs/hooks/use-disclosure
 */
export function useDisclosure(props: UseDisclosureProps = {}) {
  const {
    onClose: onCloseProp,
    onOpen: onOpenProp,
    open: openProp,
    id: idProp,
  } = props

  const handleOpen = useCallbackRef(onOpenProp)
  const handleClose = useCallbackRef(onCloseProp)

  const [openState, setopen] = useState(props.defaultOpen || false)

  const open = openProp !== undefined ? openProp : openState

  const isControlled = openProp !== undefined

  const uid = useId()
  const id = idProp ?? `disclosure-${uid}`

  const onClose = useCallback(() => {
    if (!isControlled) {
      setopen(false)
    }
    handleClose?.()
  }, [isControlled, handleClose])

  const onOpen = useCallback(() => {
    if (!isControlled) {
      setopen(true)
    }
    handleOpen?.()
  }, [isControlled, handleOpen])

  const onToggle = useCallback(() => {
    if (open) {
      onClose()
    } else {
      onOpen()
    }
  }, [open, onOpen, onClose])

  function getButtonProps(props: HTMLProps = {}): HTMLProps {
    return {
      ...props,
      "aria-expanded": open,
      "aria-controls": id,
      onClick(event) {
        props.onClick?.(event)
        onToggle()
      },
    }
  }

  function getDisclosureProps(props: HTMLProps = {}): HTMLProps {
    return {
      ...props,
      hidden: !open,
      id,
    }
  }

  return {
    open,
    onOpen,
    onClose,
    onToggle,
    isControlled,
    getButtonProps,
    getDisclosureProps,
  }
}

export type UseDisclosureReturn = ReturnType<typeof useDisclosure>
