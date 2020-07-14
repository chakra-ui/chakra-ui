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
  SlidePlacement,
  createSlideConfig,
  createSlideBaseStyle,
  TransitionConfigProps,
} from "@chakra-ui/transition"
import { createContext, cx, __DEV__, callAllHandlers } from "@chakra-ui/utils"
import * as React from "react"
import { RemoveScroll } from "react-remove-scroll"
import { useModal, UseModalProps, UseModalReturn } from "@chakra-ui/modal"

const [DrawerContextProvider, useDrawerContext] = createContext<
  UseModalReturn & { placement: SlidePlacement }
>({
  strict: true,
  name: "DrawerContext",
  errorMessage:
    "useDrawerContext: `context` is undefined. Seems you forgot to wrap modal components in `<Modal />`",
})

export interface DrawerProps
  extends UseModalProps,
    ThemingProps,
    TransitionConfigProps {
  children?: React.ReactNode
  placement?: SlidePlacement
  /**
   * Function that will be called to get the parent element
   * that the modal will be attached to.
   */
  getContainer?: PortalProps["getContainer"]
}

const transitionConfig = (props: any) => ({
  overlay: {
    timeout: { enter: 200, exit: 200 },
    transition: {
      easing: "cubic-bezier(.05,.86,.47,1.02)",
      duration: "200ms",
      property: "opacity",
    },
    enter: {
      from: { opacity: 0.01 },
      to: { opacity: 1 },
    },
    exit: {
      from: { opacity: 1 },
      to: { opacity: 0.01 },
    },
  },
  content: createSlideConfig(props.placement),
})

/**
 * Drawer
 *
 * React component that provides context, theming, and accessbility properties
 * to all other modal components.
 *
 * It doesn't render any DOM node.
 */
export function Drawer(props: DrawerProps) {
  const { getContainer, children, placement = "right" } = props

  const styles = useStyleConfig("Drawer", props)
  const transitions = useTransitionConfig(
    "Drawer",
    { transitionConfig, placement },
    { content: "content", overlay: "overlay" },
  )

  const modalCtx = useModal(props)
  const modal = React.useMemo(() => modalCtx, [modalCtx])

  return (
    <DrawerContextProvider value={{ ...modal, placement }}>
      <Portal getContainer={getContainer}>
        <StylesProvider value={styles}>
          <TransitionsProvider value={transitions}>
            {children}
          </TransitionsProvider>
        </StylesProvider>
      </Portal>
    </DrawerContextProvider>
  )
}

Drawer.defaultProps = {
  returnFocusOnClose: true,
  trapFocus: true,
  autoFocus: true,
  blockScrollOnMount: true,
  allowPinchZoom: false,
}

if (__DEV__) {
  Drawer.displayName = "Drawer"
}

export type DrawerContentProps = PropsOf<typeof chakra.section>

/**
 * DrawerContent
 *
 * React component used to group modal's content. It has all the
 * necessary `aria-*` properties to indicate that it's a modal modal
 */
export const DrawerContent = React.forwardRef(function DrawerContent(
  props: DrawerContentProps,
  ref: React.Ref<any>,
) {
  const { className, children, ...rest } = props

  const { isOpen, placement, getContentProps } = useDrawerContext()

  const content = getContentProps({ ...rest, ref })
  const _className = cx("chakra-drawer__content", className)

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
          position: "fixed",
          display: "flex",
          flexDirection: "column",
          willChange: "transform,opacity",
          width: "100%",
          outline: 0,
          ...createSlideBaseStyle(placement),
          ...transitions.content.styles,
        }}
      >
        {children}
      </chakra.section>
    </CSSTransition>
  )
})

if (__DEV__) {
  DrawerContent.displayName = "DrawerContent"
}

export type DrawerOverlayProps = PropsOf<typeof chakra.div>

/**
 * DrawerOverlay
 *
 * React component that renders a backdrop behind the modal. It's
 * also used as a wrapper for the modal content for better positioning.
 *
 * @see Docs https://chakra-ui.com/components/modal
 */
export const DrawerOverlay = React.forwardRef(function DrawerOverlay(
  props: DrawerOverlayProps,
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
  } = useDrawerContext()

  const overlay = getOverlayProps({ ...rest, ref })
  const _className = cx("chakra-drawer__overlay", className)

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
              position: "fixed",
              top: 0,
              left: 0,
              display: "flex",
              justifyContent: "center",
              overflow: "hidden",
              height: "100vh",
              width: "100vw",
              willChange: "opacity",
              ...styles.overlay,
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
  DrawerOverlay.displayName = "DrawerOverlay"
}

export type DrawerHeaderProps = PropsOf<typeof chakra.header>

/**
 * DrawerHeader
 *
 * React component that houses the title of the modal.
 *
 * @see Docs https://chakra-ui.com/components/modal
 */
export const DrawerHeader = React.forwardRef(function DrawerHeader(
  props: DrawerHeaderProps,
  ref: React.Ref<any>,
) {
  const { className, ...rest } = props

  const { headerId, setHeaderMounted } = useDrawerContext()

  /**
   * Notify us if this component was rendered or used
   * so we can append `aria-labelledby` automatically
   */
  React.useEffect(() => {
    setHeaderMounted(true)
    return () => setHeaderMounted(false)
  }, [setHeaderMounted])

  const _className = cx("chakra-drawer__header", className)
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
  DrawerHeader.displayName = "DrawerHeader"
}

export type DrawerBodyProps = PropsOf<typeof chakra.div>

/**
 * DrawerBody
 *
 * React component that houses the main content of the modal.
 *
 * @see Docs https://chakra-ui.com/components/modal
 */
export const DrawerBody = forwardRef(function DrawerBody(
  props: DrawerBodyProps,
  ref: React.Ref<any>,
) {
  const { className, ...rest } = props
  const { bodyId, setBodyMounted } = useDrawerContext()

  /**
   * Notify us if this component was rendered or used
   * so we can append `aria-describedby` automatically
   */
  React.useEffect(() => {
    setBodyMounted(true)
    return () => setBodyMounted(false)
  }, [setBodyMounted])

  const _className = cx("chakra-drawer__body", className)
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
  DrawerBody.displayName = "DrawerBody"
}

/**
 * DrawerFooter
 *
 * React component that houses the action buttons of the modal.
 *
 * @see Docs https://chakra-ui.com/components/modal
 */
export const DrawerFooter = (props: PropsOf<typeof chakra.footer>) => {
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
      className={cx("chakra-drawer__footer", props.className)}
    />
  )
}

if (__DEV__) {
  DrawerFooter.displayName = "DrawerFooter"
}

/**
 * ModalCloseButton
 *
 * React component used closes the modal. You don't need
 * to pass the `onClick` to it, it's reads the `onClose` action from the
 * modal context.
 */
export const DrawerCloseButton = React.forwardRef(function DrawerCloseButton(
  props: CloseButtonProps,
  ref: React.Ref<any>,
) {
  const { onClick, className, ...rest } = props
  const { onClose } = useDrawerContext()

  const _className = cx("chakra-drawer__close-btn", className)

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
  DrawerCloseButton.displayName = "DrawerCloseButton"
}
