import * as React from "react"
import { useControllableProp } from "./useControllableProp"
import usePrevious from "./usePrevious"

export interface UseDisclosureOptions {
  isOpen?: boolean
  defaultIsOpen?: boolean
  onClose?: () => void
  onOpen?: () => void
}

export function useDisclosure(props: UseDisclosureOptions = {}) {
  const { onClose: onCloseProp, onOpen: onOpenProp } = props

  const [isOpenState, setIsOpen] = React.useState(props.defaultIsOpen || false)
  const [isControlled, isOpen] = useControllableProp(props.isOpen, isOpenState)

  const prevIsOpen = usePrevious(isOpen)

  const onClose = React.useCallback(() => {
    if (!isControlled) {
      setIsOpen(false)
    }
    if (onCloseProp) {
      onCloseProp()
    }
  }, [isControlled, onCloseProp])

  const onOpen = React.useCallback(() => {
    if (!isControlled) {
      setIsOpen(true)
    }
    if (onOpenProp) {
      onOpenProp()
    }
  }, [isControlled, onOpenProp])

  const onToggle = React.useCallback(() => {
    if (isOpen) onClose()
    else onOpen()
  }, [isOpen, onOpen, onClose])

  return {
    isOpen: Boolean(isOpen),
    prevIsOpen: Boolean(prevIsOpen),
    onOpen,
    onClose,
    onToggle,
    isControlled,
  }
}

export type UseDisclosureReturn = ReturnType<typeof useDisclosure>

export default useDisclosure
