import { CloseButton, CloseButtonProps } from "@chakra-ui/close-button"
import {
  chakra,
  omitThemingProps,
  GetProps,
  StylesProvider,
  ThemingProps,
  useMultiStyleConfig,
  useStyles,
  forwardRef,
} from "@chakra-ui/system"
import {
  createContext,
  cx,
  ReactNodeOrRenderProp,
  runIfFn,
  __DEV__,
} from "@chakra-ui/utils"
import React, { Children, cloneElement, useEffect } from "react"
import { usePopover, UsePopoverProps, UsePopoverReturn } from "./use-popover"

const [PopoverProvider, usePopoverContext] = createContext<UsePopoverReturn>({
  name: "PopoverContext",
  errorMessage:
    "usePopoverContext: `context` is undefined. Seems you forgot to wrap all popover components within `<Popover />`",
})

export { usePopoverContext }

export interface PopoverProps extends UsePopoverProps, ThemingProps {
  /**
   * The content of the popover. It's usually the `PopoverTrigger`,
   * and `PopoverContent`
   */
  children?: ReactNodeOrRenderProp<{
    isOpen: boolean
    onClose(): void
  }>
}

/**
 * Popover is used to bring attention to specific user interface elements,
 * typically to suggest an action or to guide users through a new experience.
 */
export const Popover: React.FC<PopoverProps> = (props) => {
  const styles = useMultiStyleConfig("Popover", props)

  const { children, ...rest } = omitThemingProps(props)
  const context = usePopover(rest)

  return (
    <PopoverProvider value={context}>
      <StylesProvider value={styles}>
        {runIfFn(children, {
          isOpen: context.isOpen,
          onClose: context.onClose,
        })}
      </StylesProvider>
    </PopoverProvider>
  )
}

if (__DEV__) {
  Popover.displayName = "Popover"
}

/**
 * PopoverTrigger opens the popover's content. It must be an interactive element
 * such as `button` or `a`.
 */
export const PopoverTrigger: React.FC = (props) => {
  // enforce a single child
  const child: any = Children.only(props.children)
  const { getTriggerProps } = usePopoverContext()
  return cloneElement(child, getTriggerProps(child.props, child.ref))
}

if (__DEV__) {
  PopoverTrigger.displayName = "PopoverTrigger"
}

export interface PopoverContentProps extends GetProps<typeof chakra.section> {}

/**
 * PopoverContent includes all accessibility
 * requirements for a popover
 */
export const PopoverContent = forwardRef<PopoverContentProps, "section">(
  function PopoverContent(props, ref) {
    const { getPopoverProps } = usePopoverContext()
    const popoverProps = getPopoverProps(props, ref)

    const styles = useStyles()
    const contentStyles = {
      position: "relative",
      display: "flex",
      flexDirection: "column",
      ...styles.content,
    }

    return (
      <chakra.section
        className={cx("chakra-popover__content")}
        {...popoverProps}
        __css={contentStyles}
      />
    )
  },
)

if (__DEV__) {
  PopoverContent.displayName = "PopoverContent"
}

export interface PopoverHeaderProps extends GetProps<typeof chakra.header> {}

/**
 * PopoverHeader is the accessible header or label
 * for the popover's content and it's first announced by screenreaders.
 */
export const PopoverHeader = forwardRef<PopoverHeaderProps, "header">(
  function PopoverHeader(props, ref) {
    const { headerId, setHasHeader } = usePopoverContext()

    useEffect(() => {
      setHasHeader.on()
      return () => setHasHeader.off()
    }, [setHasHeader])

    const styles = useStyles()

    return (
      <chakra.header
        {...props}
        className={cx("chakra-popover__header", props.className)}
        id={headerId}
        ref={ref}
        __css={styles.header}
      />
    )
  },
)

if (__DEV__) {
  PopoverHeader.displayName = "PopoverHeader"
}

export interface PopoverBodyProps extends GetProps<typeof chakra.div> {}

/**
 * PopoverBody is the main content area for the popover. Should contain
 * at least one interactive element.
 */
export const PopoverBody = forwardRef<PopoverBodyProps, "div">(
  function PopoverBody(props, ref) {
    const { bodyId, setHasBody } = usePopoverContext()

    useEffect(() => {
      setHasBody.on()
      return () => setHasBody.off()
    }, [setHasBody])

    const styles = useStyles()

    return (
      <chakra.div
        {...props}
        className={cx("chakra-popover__body", props.className)}
        id={bodyId}
        ref={ref}
        __css={styles.body}
      />
    )
  },
)

if (__DEV__) {
  PopoverBody.displayName = "PopoverBody"
}
export interface PopoverFooterProps extends GetProps<typeof chakra.footer> {}

export const PopoverFooter: React.FC<PopoverFooterProps> = (props) => {
  const styles = useStyles()
  return (
    <chakra.footer
      {...props}
      className={cx("chakra-popover__footer", props.className)}
      __css={styles.footer}
    />
  )
}

if (__DEV__) {
  PopoverFooter.displayName = "PopoverFooter"
}

export type PopoverCloseButtonProps = CloseButtonProps

export const PopoverCloseButton: React.FC<CloseButtonProps> = (props) => {
  const { onClose } = usePopoverContext()
  return (
    <CloseButton
      size="sm"
      onClick={onClose}
      position="absolute"
      borderRadius="md"
      top="0.25rem"
      right="0.5rem"
      padding="0.5rem"
      {...props}
    />
  )
}

if (__DEV__) {
  PopoverCloseButton.displayName = "PopoverCloseButton"
}

export interface PopoverArrowProps extends GetProps<typeof chakra.div> {}

export const PopoverArrow: React.FC<PopoverArrowProps> = (props) => {
  const { getArrowProps } = usePopoverContext()
  const arrowProps = getArrowProps(props)

  const styles = useStyles()
  const arrowStyles = {
    bg: "inherit",
    ...styles.arrow,
  }

  return (
    <chakra.div
      {...arrowProps}
      className={cx("chakra-popover__arrow", props.className)}
      __css={arrowStyles}
    />
  )
}

if (__DEV__) {
  PopoverArrow.displayName = "PopoverArrow"
}
