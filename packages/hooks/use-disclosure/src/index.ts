import { useCallbackRef } from "@chakra-ui/react-use-callback-ref"
import React, { useCallback, useState, useId } from "react"

export interface UseDisclosureProps {
  isOpen?: boolean
  defaultIsOpen?: boolean
  onClose?(): void
  onOpen?(): void
  id?: string
}

type HTMLProps = React.HTMLAttributes<HTMLElement>

export function useDisclosure(props: UseDisclosureProps = {}) {
  const {
    onClose: onCloseProp,
    onOpen: onOpenProp,
    isOpen: isOpenProp,
    id: idProp,
  } = props

  const handleOpen = useCallbackRef(onOpenProp)
  const handleClose = useCallbackRef(onCloseProp)

  const [isOpenState, setIsOpen] = useState(props.defaultIsOpen || false)

  const isOpen = isOpenProp !== undefined ? isOpenProp : isOpenState

  const isControlled = isOpenProp !== undefined

  const uid = useId()
  const id = idProp ?? `disclosure-${uid}`

  const onClose = useCallback(() => {
    if (!isControlled) {
      setIsOpen(false)
    }
    handleClose?.()
  }, [isControlled, handleClose])

  const onOpen = useCallback(() => {
    if (!isControlled) {
      setIsOpen(true)
    }
    handleOpen?.()
  }, [isControlled, handleOpen])

  const onToggle = useCallback(() => {
    if (isOpen) {
      onClose()
    } else {
      onOpen()
    }
  }, [isOpen, onOpen, onClose])

  function getButtonProps(props: HTMLProps = {}): HTMLProps {
    return {
      ...props,
      "aria-expanded": isOpen,
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
      hidden: !isOpen,
      id,
    }
  }

  return {
    isOpen,
    onOpen,
    onClose,
    onToggle,
    isControlled,
    getButtonProps,
    getDisclosureProps,
  }
}

export type UseDisclosureReturn = ReturnType<typeof useDisclosure>
