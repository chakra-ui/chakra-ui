import { CloseButton, CloseButtonProps } from "@chakra-ui/close-button"
import { FocusLock } from "@chakra-ui/focus-lock"
import { useModal, UseModalProps, UseModalReturn } from "@chakra-ui/modal"
import { Portal, PortalProps } from "@chakra-ui/portal"
import {
  chakra,
  forwardRef,
  PropsOf,
  StylesProvider,
  ThemingProps,
  useStyleConfig,
  useStyles,
  SystemStyleObject,
} from "@chakra-ui/system"
import {
  createSlideBaseStyle,
  CSSTransition,
  SlidePlacement,
  TransitionConfigProps,
  TransitionsProvider,
  useTransitionConfig,
  useTransitions,
} from "@chakra-ui/transition"
import {
  callAllHandlers,
  createContext,
  cx,
  __DEV__,
  Dict,
} from "@chakra-ui/utils"
import * as React from "react"
import { RemoveScroll } from "react-remove-scroll"
import { transitionConfig } from "./drawer.transition"

////////////////////////////////////////////////////////////////////////////////////

const [DrawerContextProvider, useDrawerContext] = createContext<
  UseModalReturn & { placement: SlidePlacement }
>({
  strict: true,
  name: "DrawerContext",
  errorMessage:
    "useDrawerContext: `context` is undefined. Seems you forgot to wrap drawer components in `<Drawer />`",
})

////////////////////////////////////////////////////////////////////////////////////

export interface DrawerProps
  extends UseModalProps,
    ThemingProps,
    TransitionConfigProps {
  children?: React.ReactNode
  /**
   *  Set the position of the drawer should slide from.
   */
  placement?: SlidePlacement
  /**
   *  If `true`, the drawer fills the height of the viewport by default.
   */
  isFullHeight?: boolean
  /**
   *  Function that returns the parent node the drawer will be attached to.
   */
  getContainer?: PortalProps["getContainer"]
}

/**
 * Drawer provides context, theming, and accessibility functions
 * to it's sub-components. It doesn't render any DOM node.
 */
export function Drawer(props: DrawerProps) {
  const { getContainer, children, placement = "right" } = props

  // Resolve the styles defined in `theme.components.Drawer`
  const styles = useStyleConfig("Drawer", props)

  // Resolve the transition styles used in `CSSTransition`
  const transitions = useTransitionConfig(
    "Drawer",
    { transitionConfig, placement },
    { content: "content", overlay: "overlay" },
  )

  // Include modal functionality and accessiblity requirements
  const ctx = useModal(props)
  const drawer = React.useMemo(() => ({ ...ctx, placement }), [ctx, placement])

  return (
    <DrawerContextProvider value={drawer}>
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

////////////////////////////////////////////////////////////////////////////////////

export type DrawerContentProps = PropsOf<typeof chakra.section>

/**
 * DrawerContent is used to group drawer's content and include all the
 * WAI-ARIA requirements for modal dialogs.
 */
export const DrawerContent = React.forwardRef(function DrawerContent(
  props: DrawerContentProps,
  ref: React.Ref<any>,
) {
  const { className, children, ...rest } = props

  const { isOpen, placement, getContentProps } = useDrawerContext()

  const content = getContentProps({ ...rest, ref }) as Dict
  content.className = cx("chakra-drawer__content", className)

  // read styles from `StylesProvider`
  const styles = useStyles()

  // read transition properties from `TransitionsProvider`
  const transitions = useTransitions()

  // compute styles based on `placement`
  const placementStyles = createSlideBaseStyle(placement)

  // merge component, placement, and transition styles
  const contentStyles: SystemStyleObject = {
    position: "fixed",
    display: "flex",
    flexDirection: "column",
    willChange: "transform,opacity",
    width: "100%",
    outline: 0,
    ...styles.content,
    ...placementStyles,
    ...transitions.content.styles,
  }

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
      <chakra.section {...content} __css={contentStyles}>
        {children}
      </chakra.section>
    </CSSTransition>
  )
})

if (__DEV__) {
  DrawerContent.displayName = "DrawerContent"
}

////////////////////////////////////////////////////////////////////////////////////

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

  const overlay = getOverlayProps({ ...rest, ref }) as Dict
  overlay.className = cx("chakra-drawer__overlay", className)

  // read styles from `StylesProvider`
  const styles = useStyles()

  // read transition properties from `TransitionsProvider`
  const transitions = useTransitions()

  // merge component, placement, and transition styles
  const overlayStyles: SystemStyleObject = {
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
  }

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
          <chakra.div {...overlay} __css={overlayStyles}>
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

////////////////////////////////////////////////////////////////////////////////////

export type DrawerHeaderProps = PropsOf<typeof chakra.header>

/**
 * DrawerHeader houses the title of the modal.
 *
 * @see Docs https://chakra-ui.com/components/drawer
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

////////////////////////////////////////////////////////////////////////////////////

export type DrawerBodyProps = PropsOf<typeof chakra.div>

/**
 * DrawerBody houses the main content of the modal.
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

////////////////////////////////////////////////////////////////////////////////////

/**
 * DrawerFooter houses the action buttons of the drawer.
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

////////////////////////////////////////////////////////////////////////////////////

/**
 * Button that closes the modal without passing the `onClick` handler
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
