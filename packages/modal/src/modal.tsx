import { CloseButton, CloseButtonProps } from "@chakra-ui/close-button"
import { FocusLock } from "@chakra-ui/focus-lock"
import { Portal, PortalProps } from "@chakra-ui/portal"
import {
  chakra,
  forwardRef,
  PropsOf,
  StylesProvider,
  ThemingProps,
  useStyleConfig,
  useStyles,
} from "@chakra-ui/system"
import {
  CSSTransition,
  TransitionsProvider,
  useTransitionConfig,
  useTransitions,
} from "@chakra-ui/transition"
import { createContext, cx, __DEV__, callAllHandlers } from "@chakra-ui/utils"
import * as React from "react"
import { RemoveScroll } from "react-remove-scroll"
import { useModal, UseModalProps, UseModalReturn } from "./use-modal"

const [ModalContextProvider, useModalContext] = createContext<UseModalReturn>({
  strict: true,
  name: "ModalContext",
  errorMessage:
    "useModalContext: `context` is undefined. Seems you forgot to wrap modal components in `<Modal />`",
})

export interface ModalProps extends UseModalProps, ThemingProps {
  children?: React.ReactNode
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
  const styles = useStyleConfig("Modal", props)
  const transitions = useTransitionConfig("Modal", props, {
    content: "content",
    overlay: "overlay",
  })

  const modal = useModal(props)

  const { getContainer, children } = props

  return (
    <ModalContextProvider value={modal}>
      <Portal getContainer={getContainer}>
        <StylesProvider value={styles}>
          <TransitionsProvider value={transitions}>
            {children}
          </TransitionsProvider>
        </StylesProvider>
      </Portal>
    </ModalContextProvider>
  )
}

Modal.defaultProps = {
  returnFocusOnClose: true,
  scrollBehavior: "outside",
  trapFocus: true,
  autoFocus: true,
  blockScrollOnMount: true,
  allowPinchZoom: false,
}

if (__DEV__) {
  Modal.displayName = "Modal"
}

export type ModalContentProps = PropsOf<typeof chakra.section>

/**
 * ModalContent
 *
 * React component used to group modal's content. It has all the
 * necessary `aria-*` properties to indicate that it's a modal modal
 */
export const ModalContent = React.forwardRef(function ModalContent(
  props: ModalContentProps,
  ref: React.Ref<any>,
) {
  const { className, children, ...rest } = props

  const { isOpen, getContentProps } = useModalContext()

  const content = getContentProps({ ...rest, ref })
  const _className = cx("chakra-modal__content", className)

  const styles = useStyles()
  const transitions = useTransitions()

  return (
    <CSSTransition
      in={isOpen}
      addEndListener={(node, done) => {
        node.addEventListener("transitionend", done, false)
      }}
      classNames="content"
      timeout={transitions.content.timeout}
      unmountOnExit
      appear
    >
      <chakra.section
        className={_className}
        {...content}
        __css={{
          ...styles.content,
          display: "flex",
          flexDirection: "column",
          position: "relative",
          width: "100%",
          outline: 0,
          ...transitions.content.styles,
        }}
      >
        {children}
      </chakra.section>
    </CSSTransition>
  )
})

if (__DEV__) {
  ModalContent.displayName = "ModalContent"
}

export type ModalOverlayProps = PropsOf<typeof chakra.div>

/**
 * ModalOverlay
 *
 * React component that renders a backdrop behind the modal. It's
 * also used as a wrapper for the modal content for better positioning.
 *
 * @see Docs https://chakra-ui.com/components/modal
 */
export const ModalOverlay = React.forwardRef(function ModalOverlay(
  props: ModalOverlayProps,
  ref: React.Ref<any>,
) {
  const { className, children, ...rest } = props

  const {
    isOpen,
    getOverlayProps,
    autoFocus,
    trapFocus,
    dialogRef,
    overlayRef,
    initialFocusRef,
    blockScrollOnMount,
    allowPinchZoom,
    finalFocusRef,
    returnFocusOnClose,
  } = useModalContext()

  const overlay = getOverlayProps({ ...rest, ref })
  const _className = cx("chakra-modal__overlay", className)

  const styles = useStyles()
  const transitions = useTransitions()

  return (
    <CSSTransition
      timeout={transitions.overlay.timeout}
      in={isOpen}
      unmountOnExit
      classNames="overlay"
      nodeRef={overlayRef}
      addEndListener={(done: any) => {
        overlayRef.current?.addEventListener("transitionend", done, false)
      }}
    >
      <FocusLock
        autoFocus={autoFocus}
        isDisabled={!trapFocus}
        initialFocusRef={initialFocusRef}
        finalFocusRef={finalFocusRef}
        restoreFocus={returnFocusOnClose}
        contentRef={dialogRef}
      >
        <RemoveScroll
          allowPinchZoom={allowPinchZoom}
          enabled={blockScrollOnMount}
        >
          <chakra.div
            {...overlay}
            className={_className}
            __css={{
              ...styles.overlay,
              width: "100vw",
              height: "100vh",
              position: "fixed",
              left: 0,
              top: 0,
              ...transitions.overlay.styles,
            }}
          >
            {children}
          </chakra.div>
        </RemoveScroll>
      </FocusLock>
    </CSSTransition>
  )
})

if (__DEV__) {
  ModalOverlay.displayName = "ModalOverlay"
}

export type ModalHeaderProps = PropsOf<typeof chakra.header>

/**
 * ModalHeader
 *
 * React component that houses the title of the modal.
 *
 * @see Docs https://chakra-ui.com/components/modal
 */
export const ModalHeader = React.forwardRef(function ModalHeader(
  props: ModalHeaderProps,
  ref: React.Ref<any>,
) {
  const { className, ...rest } = props

  const { headerId, setHeaderMounted } = useModalContext()

  /**
   * Notify us if this component was rendered or used
   * so we can append `aria-labelledby` automatically
   */
  React.useEffect(() => {
    setHeaderMounted(true)
    return () => setHeaderMounted(false)
  }, [setHeaderMounted])

  const _className = cx("chakra-modal__header", className)
  const styles = useStyles()

  return (
    <chakra.header
      ref={ref}
      className={_className}
      id={headerId}
      {...rest}
      __css={{
        flex: 0,
        ...styles.header,
      }}
    />
  )
})

if (__DEV__) {
  ModalHeader.displayName = "ModalHeader"
}

export type ModalBodyProps = PropsOf<typeof chakra.div>

/**
 * ModalBody
 *
 * React component that houses the main content of the modal.
 *
 * @see Docs https://chakra-ui.com/components/modal
 */
export const ModalBody = forwardRef(function ModalBody(
  props: ModalBodyProps,
  ref: React.Ref<any>,
) {
  const { className, ...rest } = props
  const { bodyId, setBodyMounted } = useModalContext()

  /**
   * Notify us if this component was rendered or used
   * so we can append `aria-describedby` automatically
   */
  React.useEffect(() => {
    setBodyMounted(true)
    return () => setBodyMounted(false)
  }, [setBodyMounted])

  const _className = cx("chakra-modal__body", className)
  const styles = useStyles()

  return (
    <chakra.div
      ref={ref}
      className={_className}
      id={bodyId}
      {...rest}
      __css={styles.body}
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
export const ModalFooter = (props: PropsOf<typeof chakra.footer>) => {
  const styles = useStyles()
  return (
    <chakra.footer
      {...props}
      __css={{
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        flex: 0,
        ...styles.footer,
      }}
      className={cx("chakra-modal__footer", props.className)}
    />
  )
}

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
export const ModalCloseButton = React.forwardRef(function ModalCloseButton(
  props: CloseButtonProps,
  ref: React.Ref<any>,
) {
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
      onClick={callAllHandlers(onClick, (event) => {
        event.stopPropagation()
        onClose()
      })}
      {...rest}
    />
  )
})

if (__DEV__) {
  ModalCloseButton.displayName = "ModalCloseButton"
}
