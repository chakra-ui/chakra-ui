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
  /**
   * The `ref` of element to receive focus when the modal opens.
   */
  initialFocusRef?: React.RefObject<any>
  /**
   * The `ref` of element to receive focus when the modal closes.
   */
  finalFocusRef?: React.RefObject<any>
  /**
   * If `true`, the modal will return focus to the element that triggered it when it closes.
   */
  returnFocusOnClose?: boolean
  /**
   *  If `true`, the modal will be centered on screen.
   */
  isCentered?: boolean
  /**
   * Where scroll behaviour should originate.
   * - If set to `inside`, scroll only occurs within the `ModalBody`.
   * - If set to `outside`, the entire `ModalContent` will scroll within the viewport.
   */
  scrollBehavior?: "inside" | "outside"
}

export function Dialog(props: DialogProps) {
  const {
    initialFocusRef,
    finalFocusRef,
    returnFocusOnClose = true,
    children,
    scrollBehavior,
    isCentered,
  } = props
  const context = useDialog(props)

  if (!props.isOpen) return null

  return (
    <DialogContextProvider value={context}>
      <Portal>
        <FocusLock
          initialFocusRef={initialFocusRef}
          finalFocusRef={finalFocusRef}
          restoreFocus={returnFocusOnClose}
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
