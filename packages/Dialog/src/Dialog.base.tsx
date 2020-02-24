import { FocusLock } from "@chakra-ui/focus-lock"
import { Portal } from "@chakra-ui/portal"
import { PropsOf } from "@chakra-ui/system"
import { createContext } from "@chakra-ui/utils"
import * as React from "react"
import { DialogHookProps, DialogHookReturn, useDialog } from "./Dialog.hook"
import { useIsomorphicEffect } from "@chakra-ui/hooks"

const [DialogContextProvider, useDialogContext] = createContext<
  DialogHookReturn
>()

export interface DialogProps extends DialogHookProps {
  children?: React.ReactNode
  initialFocusRef?: React.RefObject<any>
  finalFocusRef?: React.RefObject<any>
  restoreFocus?: boolean
}

export function Dialog(props: DialogProps) {
  const {
    initialFocusRef,
    finalFocusRef,
    restoreFocus = true,
    children,
  } = props
  const context = useDialog(props)

  if (!props.isOpen) return null

  return (
    <DialogContextProvider value={context}>
      <Portal>
        <FocusLock
          initialFocusRef={initialFocusRef}
          finalFocusRef={finalFocusRef}
          restoreFocus={restoreFocus}
        >
          {children}
        </FocusLock>
      </Portal>
    </DialogContextProvider>
  )
}

export type BaseDialogContentProps = PropsOf<"section">

export const BaseDialogContent = (props: BaseDialogContentProps) => {
  const { getDialogContentProps } = useDialogContext()
  return <section {...getDialogContentProps(props)} />
}

export type BaseDialogOverlayProps = PropsOf<"div">

export const BaseDialogOverlay = (props: BaseDialogOverlayProps) => {
  const { getDialogOverlayProps } = useDialogContext()
  return <div {...getDialogOverlayProps(props)} />
}

export type BaseDialogHeaderProps = PropsOf<"header">

export const BaseDialogHeader = (props: BaseDialogOverlayProps) => {
  const { headerId, setHeaderMounted } = useDialogContext()

  useIsomorphicEffect(() => {
    setHeaderMounted(true)
    return () => setHeaderMounted(false)
  }, [])

  return <header id={headerId} {...props} />
}

export type BaseDialogBodyProps = PropsOf<"div">

export const BaseDialogBody = (props: BaseDialogBodyProps) => {
  const { bodyId, setBodyMounted } = useDialogContext()

  useIsomorphicEffect(() => {
    setBodyMounted(true)
    return () => setBodyMounted(false)
  }, [])

  return <div id={bodyId} {...props} />
}
