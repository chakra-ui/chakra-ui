import { callAllHandlers } from "@chakra-ui/utils"
import * as React from "react"
import { useControllableProp } from "./use-controllable"
import { useId } from "./use-id"
import { useCallbackRef } from "./use-callback-ref"

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

  const onOpenPropCallbackRef = useCallbackRef(onOpenProp)
  const onClosePropCallbackRef = useCallbackRef(onCloseProp)
  const [isOpenState, setIsOpen] = React.useState(props.defaultIsOpen || false)
  const [isControlled, isOpen] = useControllableProp(isOpenProp, isOpenState)

  const id = useId(idProp, "disclosure")

  const onClose = React.useCallback(() => {
    if (!isControlled) {
      setIsOpen(false)
    }
    onClosePropCallbackRef?.()
  }, [isControlled, onClosePropCallbackRef])

  const onOpen = React.useCallback(() => {
    if (!isControlled) {
      setIsOpen(true)
    }
    onOpenPropCallbackRef?.()
  }, [isControlled, onOpenPropCallbackRef])

  const onToggle = React.useCallback(() => {
    const action = isOpen ? onClose : onOpen
    action()
  }, [isOpen, onOpen, onClose])

  return {
    isOpen: !!isOpen,
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
