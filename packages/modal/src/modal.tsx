import { CloseButton, CloseButtonProps } from "@chakra-ui/close-button"
import { FocusLock } from "@chakra-ui/focus-lock"
import { Portal, PortalProps } from "@chakra-ui/portal"
import {
  chakra,
  forwardRef,
  PropsOf,
  ThemingProps,
  useMultiStyleConfig,
  StylesProvider,
  useStyles,
} from "@chakra-ui/system"
import { callAllHandlers, cx, __DEV__ } from "@chakra-ui/utils"
import React, { ReactNode, useEffect } from "react"
import { RemoveScroll } from "react-remove-scroll"
import { ModalContextProvider, useModalContext } from "./context"
import { useModal, UseModalProps } from "./use-modal"

export interface ModalProps extends UseModalProps, ThemingProps {
  children?: ReactNode
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
export const Modal: React.FC<ModalProps> = (props) => {
  const { getContainer, children } = props

  const styles = useMultiStyleConfig("Modal", props)
  const modal = useModal(props)

  if (!modal.isOpen) return null

  return (
    <ModalContextProvider value={modal}>
      <Portal getContainer={getContainer}>
        <StylesProvider value={styles}>{children}</StylesProvider>
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
export const ModalContent: React.FC<ModalContentProps> = forwardRef(
  (props, ref) => {
    const { className, children, ...otherProps } = props

    const { getContentProps } = useModalContext()

    const content = getContentProps(otherProps, ref)
    const _className = cx("chakra-modal__content", className)

    const styles = useStyles()

    return (
      <chakra.section
        className={_className}
        {...content}
        __css={{
          display: "flex",
          flexDirection: "column",
          position: "relative",
          width: "100%",
          outline: 0,
          ...styles.content,
        }}
      >
        {children}
      </chakra.section>
    )
  },
)

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
export const ModalOverlay: React.FC<ModalOverlayProps> = forwardRef(
  (props, ref) => {
    const { className, children, ...otherProps } = props

    const {
      getOverlayProps,
      autoFocus,
      trapFocus,
      dialogRef,
      initialFocusRef,
      blockScrollOnMount,
      allowPinchZoom,
      finalFocusRef,
      returnFocusOnClose,
    } = useModalContext()

    const overlay = getOverlayProps(otherProps, ref)
    const _className = cx("chakra-modal__overlay", className)

    const styles = useStyles()

    return (
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
              width: "100vw",
              height: "100vh",
              position: "fixed",
              left: 0,
              top: 0,
              ...styles.overlay,
            }}
          >
            {children}
          </chakra.div>
        </RemoveScroll>
      </FocusLock>
    )
  },
)

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
export const ModalHeader: React.FC<ModalHeaderProps> = forwardRef(
  (props, ref) => {
    const { className, ...rest } = props

    const { headerId, setHeaderMounted } = useModalContext()

    /**
     * Notify us if this component was rendered or used
     * so we can append `aria-labelledby` automatically
     */
    useEffect(() => {
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
  },
)

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
export const ModalBody: React.FC<ModalBodyProps> = forwardRef((props, ref) => {
  const { className, ...rest } = props
  const { bodyId, setBodyMounted } = useModalContext()

  /**
   * Notify us if this component was rendered or used
   * so we can append `aria-describedby` automatically
   */
  useEffect(() => {
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
export const ModalFooter: React.FC<PropsOf<typeof chakra.footer>> = (props) => {
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
export const ModalCloseButton: React.FC<CloseButtonProps> = forwardRef(
  (props, ref) => {
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
  },
)

if (__DEV__) {
  ModalCloseButton.displayName = "ModalCloseButton"
}
