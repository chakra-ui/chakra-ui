import { useState, useCallback } from "react"
import { useControllableProp } from "./useControllable"
import { usePrevious } from "./usePrevious"

export interface UseDisclosureProps {
  isOpen?: boolean
  defaultIsOpen?: boolean
  onClose?(): void
  onOpen?(): void
}

export function useDisclosure(props: UseDisclosureProps = {}) {
  const { onClose: onCloseProp, onOpen: onOpenProp } = props

  const [isOpenState, setIsOpen] = useState(props.defaultIsOpen || false)
  const [isControlled, isOpen] = useControllableProp(props.isOpen, isOpenState)

  const prevIsOpen = usePrevious(isOpen)

  const onClose = useCallback(() => {
    if (!isControlled) {
      setIsOpen(false)
    }
    onCloseProp?.()
  }, [isControlled, onCloseProp])

  const onOpen = useCallback(() => {
    if (!isControlled) {
      setIsOpen(true)
    }
    onOpenProp?.()
  }, [isControlled, onOpenProp])

  const onToggle = useCallback(() => {
    const action = isOpen ? onClose : onOpen
    action()
  }, [isOpen, onOpen, onClose])

  return {
    isOpen: !!isOpen,
    prevIsOpen: !!prevIsOpen,
    onOpen,
    onClose,
    onToggle,
    isControlled,
  }
}

export type UseDisclosureReturn = ReturnType<typeof useDisclosure>
