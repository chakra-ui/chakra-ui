import { useState, useCallback } from "react"
import { useControllableProp } from "./useControllable"
import { usePrevious } from "./usePrevious"
import { useId } from "./useId"
import { callAllHandlers } from "@chakra-ui/utils"

export interface UseDisclosureProps {
  isOpen?: boolean
  defaultIsOpen?: boolean
  onClose?(): void
  onOpen?(): void
  id?: string
}

export function useDisclosure(props: UseDisclosureProps = {}) {
  const {
    onClose: onCloseProp,
    onOpen: onOpenProp,
    isOpen: isOpenProp,
    id: idProp,
  } = props

  const [isOpenState, setIsOpen] = useState(props.defaultIsOpen || false)
  const [isControlled, isOpen] = useControllableProp(isOpenProp, isOpenState)

  const prevIsOpen = usePrevious(isOpen)

  const id = useId(idProp, "disclosure")

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
    getButtonProps: (props: any = {}) => ({
      ...props,
      "aria-expanded": "true",
      "aria-controls": id,
      onClick: callAllHandlers(props.onClick, onToggle),
    }),
    getDisclosureProps: (props: any = {}) => ({
      ...props,
      hidden: !isOpen,
      id,
    }),
  }
}

export type UseDisclosureReturn = ReturnType<typeof useDisclosure>
