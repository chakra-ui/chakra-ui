import { CloseButton, CloseButtonProps } from "@chakra-ui/close-button"
import { FocusLock } from "@chakra-ui/focus-lock"
import { useSafeLayoutEffect } from "@chakra-ui/hooks"
import { Portal } from "@chakra-ui/portal"
import {
  chakra,
  PropsOf,
  ThemingProps,
  useThemeDefaultProps,
} from "@chakra-ui/system"
import { createContext, callAllHandlers } from "@chakra-ui/utils"
import * as React from "react"
import { ModalHookProps, ModalHookReturn, useModal } from "./Modal.hook"

type ModalContext = ModalHookReturn &
  Pick<ModalProps, "isCentered" | "scrollBehavior"> &
  Pick<ThemingProps, "variant" | "size">

const [ModalContextProvider, useModalContext] = createContext<ModalContext>()

export interface ModalProps extends ModalHookProps, ThemingProps {
  children?: React.ReactNode
  /**
   * The `ref` of element to receive focus when the modal opens.
   */
  initialFocusRef?: React.RefObject<HTMLElement>
  /**
   * The `ref` of element to receive focus when the modal closes.
   */
  finalFocusRef?: React.RefObject<HTMLElement>
  /**
   * If `true`, the modal will return focus to the element that triggered it when it closes.
   * @default true
   */
  shouldReturnFocus?: boolean
  /**
   *  If `true`, the modal will be centered on screen.
   * @default false
   */
  isCentered?: boolean
  /**
   * Where scroll behaviour should originate.
   * - If set to `inside`, scroll only occurs within the `ModalBody`.
   * - If set to `outside`, the entire `ModalContent` will scroll within the viewport.
   *
   * @default "outside"
   */
  scrollBehavior?: "inside" | "outside"
  /**
   * If `false`, focus lock will be disabled completely.
   *
   * This is useful in situations where you still need to interact with
   * other surrounding elements.
   *
   * 🚨Warning: We don't recommend doing this because it hurts the
   * accessbility of the modal, based on WAI-ARIA specifications.
   *
   * @default true
   */
  shouldTrapFocus?: boolean
  /**
   * If `true`, the modal will autofocus the first enabled and interative
   * element within the `ModalContent`
   *
   * @default true
   */
  shouldAutoFocus?: boolean
}

/**
 * Modal
 *
 * React component that provides context, theming, and accessbility properties
 * to all other modal components.
 *
 * It doesn't render any DOM node.
 */
export function Modal(props: ModalProps) {
  const defaults = useThemeDefaultProps("Modal")

  const {
    children,
    initialFocusRef,
    finalFocusRef,
    shouldReturnFocus = true,
    isOpen = true,
    scrollBehavior = "outside",
    size = defaults?.size,
    variant = defaults?.variant,
    shouldTrapFocus = true,
    shouldAutoFocus = true,
    isCentered,
  } = props

  const context = {
    ...useModal(props),
    scrollBehavior,
    isCentered,
    size,
    variant,
  }

  if (!isOpen) return null

  return (
    <ModalContextProvider value={context}>
      <Portal>
        <FocusLock
          autoFocus={shouldAutoFocus}
          isDisabled={!shouldTrapFocus}
          initialFocusRef={initialFocusRef}
          finalFocusRef={finalFocusRef}
          restoreFocus={shouldReturnFocus}
        >
          {children}
        </FocusLock>
      </Portal>
    </ModalContextProvider>
  )
}

type ContentOptions = Pick<ModalProps, "scrollBehavior">

/**
 * ModalContent - Theming
 *
 * To style the modal content globally, change the styles in
 * `theme.components.Modal` under the `Content` key
 */
const StyledContent = chakra<"section", ContentOptions>("section", {
  themeKey: "Modal.Content",
  baseStyle: props => ({
    display: "flex",
    flexDirection: "column",
    position: "relative",
    width: "100%",
    marginY: "3.75rem",
    maxHeight:
      props.scrollBehavior === "inside" ? "calc(100vh - 7.5rem)" : undefined,
    overflow: props.scrollBehavior === "inside" ? "auto" : undefined,
    _focus: {
      outline: 0,
    },
  }),
})

export type ModalContentProps = PropsOf<typeof StyledContent>

/**
 * ModalContent
 *
 * React component used to group modal's content. It has all the
 * necessary `aria-*` properties to indicate that it's a modal modal
 */
export const ModalContent = (props: ModalContentProps) => {
  const { getContentProps, scrollBehavior, variant, size } = useModalContext()

  return (
    <StyledContent
      variant={variant}
      size={size}
      data-chakra-modal-content=""
      scrollBehavior={scrollBehavior}
      {...getContentProps(props)}
    />
  )
}

type OverlayOptions = Pick<ModalProps, "isCentered" | "scrollBehavior">

/**
 * ModalOverlay - Theming
 *
 * To style the modal overlay globally, change the styles in
 * `theme.components.Modal` under the `Overlay` key
 */
const StyledOverlay = chakra<"div", OverlayOptions>("div", {
  themeKey: "Modal.Overlay",
  baseStyle: props => ({
    display: "flex",
    justifyContent: "center",
    alignItems: props.isCentered ? "center" : "flex-start",
    overflow: props.scrollBehavior === "inside" ? "hidden" : "auto",
    position: "fixed",
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
    width: "100%",
    height: "100%",
  }),
  shouldForwardProp(prop) {
    return !["scrollBehavior", "isCentered"].includes(prop)
  },
})

export type ModalOverlayProps = PropsOf<typeof StyledOverlay>

/**
 * ModalOverlay
 *
 * React component that renders a backdrop behind the modal. It's
 * also used as a wrapper for the modal content for better positioning.
 *
 * @see Docs https://chakra-ui.com/modal
 */
export const ModalOverlay = (props: ModalOverlayProps) => {
  const {
    getOverlayProps,
    scrollBehavior,
    isCentered,
    variant,
    size,
  } = useModalContext()

  return (
    <StyledOverlay
      variant={variant}
      size={size}
      data-chakra-modal-overlay=""
      scrollBehavior={scrollBehavior}
      isCentered={isCentered}
      {...getOverlayProps(props)}
    />
  )
}

export type ModalHeaderProps = PropsOf<typeof StyledHeader>

/**
 * ModalHeader - Theming
 *
 * To style the modal header globally, change the styles in
 * `theme.components.Modal` under the `Header` key
 */
const StyledHeader = chakra("header", {
  themeKey: "Modal.Header",
})

/**
 * ModalHeader
 *
 * React component that houses the title of the modal.
 *
 * @see Docs https://chakra-ui.com/modal
 */
export const ModalHeader = (props: ModalHeaderProps) => {
  const { headerId, setHeaderMounted } = useModalContext()

  /**
   * Notify us if this component was rendered or used
   * so we can append `aria-labelledby` automatically
   */
  useSafeLayoutEffect(() => {
    setHeaderMounted(true)
    return () => setHeaderMounted(false)
  }, [])

  return <StyledHeader data-chakra-modal-header="" id={headerId} {...props} />
}

export type ModalBodyProps = PropsOf<typeof StyledBody>

/**
 * ModalBody - Theming
 *
 * To style the modal body globally, change the styles in
 * `theme.components.Modal` under the `Body` key
 */
const StyledBody = chakra("div", { themeKey: "Modal.Body" })

/**
 * ModalBody
 *
 * React component that houses the main content of the modal.
 *
 * @see Docs https://chakra-ui.com/modal
 */
export const ModalBody = (props: ModalBodyProps) => {
  const { bodyId, setBodyMounted } = useModalContext()

  /**
   * Notify us if this component was rendered or used
   * so we can append `aria-describedby` automatically
   */
  useSafeLayoutEffect(() => {
    setBodyMounted(true)
    return () => setBodyMounted(false)
  }, [])

  return <StyledBody data-chakra-modal-body="" id={bodyId} {...props} />
}

/**
 * ModalFooter
 *
 * React component that houses the action buttons of the modal.
 *
 * @see Docs https://chakra-ui.com/modal
 */
export const ModalFooter = chakra("footer", {
  themeKey: "Modal.Footer",
  baseStyle: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
  },
})

/**
 * ModalCloseButton
 *
 * React component used closes the modal. You don't need
 * to pass the `onClick` to it, it's reads the `onClose` action from the
 * modal context.
 */
export const ModalCloseButton = (props: CloseButtonProps) => {
  const { onClose } = useModalContext()
  return (
    <CloseButton
      position="absolute"
      top="8px"
      right="12px"
      {...props}
      onClick={callAllHandlers(props.onClick, onClose)}
    />
  )
}
