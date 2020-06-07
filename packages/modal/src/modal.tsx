import { CloseButton, CloseButtonProps } from "@chakra-ui/close-button"
import { FocusLock } from "@chakra-ui/focus-lock"
import { useSafeLayoutEffect } from "@chakra-ui/hooks"
import { Portal, PortalProps } from "@chakra-ui/portal"
import {
  chakra,
  PropsOf,
  ThemingProps,
  forwardRef,
  useThemeDefaultProps,
} from "@chakra-ui/system"
import {
  callAllHandlers,
  createContext,
  mergeRefs,
  __DEV__,
  cx,
} from "@chakra-ui/utils"
import * as React from "react"
import { useModal, UseModalProps, UseModalReturn } from "./use-modal"

type ModalContext = UseModalReturn &
  Pick<ModalProps, "isCentered" | "scrollBehavior"> &
  Pick<ThemingProps, "variant" | "size">

const [ModalContextProvider, useModalContext] = createContext<ModalContext>({
  strict: true,
  name: "ModalContext",
})

export interface ModalProps extends UseModalProps, ThemingProps {
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
  shouldReturnFocusOnClose?: boolean
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
  /**
   * Function that will be called to get the parent element
   * that the modal will be attached to.
   */
  getContainer?: PortalProps["getContainer"]
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
    shouldReturnFocusOnClose = true,
    isOpen,
    scrollBehavior = "outside",
    size = defaults?.size,
    variant = defaults?.variant,
    shouldTrapFocus = true,
    shouldAutoFocus = true,
    isCentered,
    getContainer,
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
      <Portal getContainer={getContainer}>
        <FocusLock
          autoFocus={shouldAutoFocus}
          isDisabled={!shouldTrapFocus}
          initialFocusRef={initialFocusRef}
          finalFocusRef={finalFocusRef}
          restoreFocus={shouldReturnFocusOnClose}
        >
          {children}
        </FocusLock>
      </Portal>
    </ModalContextProvider>
  )
}

if (__DEV__) {
  Modal.displayName = "Modal"
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
  baseStyle: (props) => {
    return {
      display: "flex",
      flexDirection: "column",
      position: "relative",
      width: "100%",
      marginY: "3.75rem",
      maxHeight:
        props.scrollBehavior === "inside" ? "calc(100vh - 7.5rem)" : undefined,
      _focus: {
        outline: 0,
      },
    }
  },
})

export type ModalContentProps = PropsOf<typeof StyledContent>

/**
 * ModalContent
 *
 * React component used to group modal's content. It has all the
 * necessary `aria-*` properties to indicate that it's a modal modal
 */
export const ModalContent = forwardRef<ModalContentProps, "section">(
  function ModalContent(props, ref) {
    const { className, ...rest } = props
    const { getContentProps, scrollBehavior, variant, size } = useModalContext()
    const contentProps = getContentProps({ ...rest, ref })

    const _className = cx("chakra-modal__content", className)
    const theming = { variant, size }

    return (
      <StyledContent
        className={_className}
        scrollBehavior={scrollBehavior}
        {...theming}
        {...contentProps}
      />
    )
  },
)

if (__DEV__) {
  ModalContent.displayName = "ModalContent"
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
  baseStyle: (props) => ({
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
 * @see Docs https://chakra-ui.com/components/modal
 */
export const ModalOverlay = forwardRef<ModalOverlayProps, "div">(
  function ModalOverlay(props, ref) {
    const { className, ...rest } = props
    const {
      getOverlayProps,
      scrollBehavior,
      isCentered,
      variant,
      size,
    } = useModalContext()

    const overlayProps = getOverlayProps({ ...rest, ref })
    const theming = { variant, size }
    const _className = cx("chakra-modal__overlay", className)

    return (
      <StyledOverlay
        className={_className}
        scrollBehavior={scrollBehavior}
        isCentered={isCentered}
        {...theming}
        {...overlayProps}
      />
    )
  },
)

if (__DEV__) {
  ModalOverlay.displayName = "ModalOverlay"
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
  baseStyle: { flex: 0 },
})

/**
 * ModalHeader
 *
 * React component that houses the title of the modal.
 *
 * @see Docs https://chakra-ui.com/components/modal
 */
export const ModalHeader = forwardRef<ModalHeaderProps, "header">(
  function ModalHeader(props, ref) {
    const { className, ...rest } = props

    const { headerId, setHeaderMounted } = useModalContext()

    /**
     * Notify us if this component was rendered or used
     * so we can append `aria-labelledby` automatically
     */
    useSafeLayoutEffect(() => {
      setHeaderMounted(true)
      return () => setHeaderMounted(false)
    }, [])

    const _className = cx("chakra-modal__header", className)

    return (
      <StyledHeader ref={ref} className={_className} id={headerId} {...rest} />
    )
  },
)

if (__DEV__) {
  ModalHeader.displayName = "ModalHeader"
}

export type ModalBodyProps = PropsOf<typeof StyledBody>

/**
 * ModalBody - Theming
 *
 * To style the modal body globally, change the styles in
 * `theme.components.Modal` under the `Body` key
 */
const StyledBody = chakra<"div", Pick<ModalProps, "scrollBehavior">>("div", {
  themeKey: "Modal.Body",
  baseStyle: (props) => ({
    flex: 1,
    overflow: props.scrollBehavior === "inside" ? "auto" : undefined,
  }),
})

/**
 * ModalBody
 *
 * React component that houses the main content of the modal.
 *
 * @see Docs https://chakra-ui.com/components/modal
 */
export const ModalBody = forwardRef<ModalBodyProps, "div">(function ModalBody(
  props,
  ref,
) {
  const { className, ...rest } = props
  const { bodyId, setBodyMounted, scrollBehavior } = useModalContext()

  /**
   * Notify us if this component was rendered or used
   * so we can append `aria-describedby` automatically
   */
  useSafeLayoutEffect(() => {
    setBodyMounted(true)
    return () => setBodyMounted(false)
  }, [])

  const _className = cx("chakra-modal__body", className)

  return (
    <StyledBody
      ref={ref}
      scrollBehavior={scrollBehavior}
      className={_className}
      id={bodyId}
      {...rest}
    />
  )
})

if (__DEV__) {
  ModalBody.displayName = "ModalBody"
}

/**
 * ModalFooter
 *
 * React component that houses the action buttons of the modal.
 *
 * @see Docs https://chakra-ui.com/components/modal
 */
export const ModalFooter = chakra("footer", {
  themeKey: "Modal.Footer",
  baseStyle: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    flex: 0,
  },
  attrs: (props) => ({
    className: cx("chakra-modal__footer", props.className),
  }),
})

if (__DEV__) {
  ModalFooter.displayName = "ModalFooter"
}

/**
 * ModalCloseButton
 *
 * React component used closes the modal. You don't need
 * to pass the `onClick` to it, it's reads the `onClose` action from the
 * modal context.
 */
export const ModalCloseButton = forwardRef<CloseButtonProps, "button">(
  function ModalCloseButton(props, ref) {
    const { onClick, className, ...rest } = props
    const { onClose } = useModalContext()

    const _className = cx("chakra-modal__close-btn", className)

    return (
      <CloseButton
        ref={ref}
        position="absolute"
        top="8px"
        right="12px"
        className={_className}
        onClick={callAllHandlers(onClick, onClose)}
        {...rest}
      />
    )
  },
)

if (__DEV__) {
  ModalCloseButton.displayName = "ModalCloseButton"
}
