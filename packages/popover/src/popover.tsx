import { CloseButton, CloseButtonProps } from "@chakra-ui/close-button"
import { useSafeLayoutEffect } from "@chakra-ui/hooks"
import {
  chakra,
  omitThemingProps,
  PropsOf,
  StylesProvider,
  ThemingProps,
  useStyleConfig,
  useStyles,
} from "@chakra-ui/system"
import {
  createContext,
  ReactNodeOrRenderProp,
  runIfFn,
  __DEV__,
} from "@chakra-ui/utils"
import * as React from "react"
import { usePopover, UsePopoverProps, UsePopoverReturn } from "./use-popover"
import CSSTransition from "react-transition-group/CSSTransition"

const [PopoverContextProvider, usePopoverContext] = createContext<
  UsePopoverReturn
>({
  name: "PopoverContext",
  errorMessage:
    "usePopoverContext: `context` is undefined. Seems you forgot to wrap all popover components within `<Popover />`",
})

export type PopoverProps = UsePopoverProps &
  ThemingProps & {
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
 * Popover
 *
 * React component used to Popovers are used to bring attention
 * to specific user interface elements, typically to suggest an
 * action or to guide users through a new experience.
 */
export function Popover(props: PopoverProps) {
  const styles = useStyleConfig("Popover", props)
  const { children, ...rest } = omitThemingProps(props)
  const context = usePopover(rest)

  return (
    <PopoverContextProvider value={context}>
      <StylesProvider value={styles}>
        {runIfFn(children, {
          isOpen: context.isOpen,
          onClose: context.onClose,
        })}
      </StylesProvider>
    </PopoverContextProvider>
  )
}

if (__DEV__) {
  Popover.displayName = "Popover"
}

/**
 * PopoverTrigger
 *
 * The trigger for the popover. It must be an interactive element
 * such as `button` or `a`.
 */
export const PopoverTrigger: React.FC = (props) => {
  // enforce a single child
  const child = React.Children.only(props.children) as React.ReactElement<any>
  const { getTriggerProps } = usePopoverContext()
  return React.cloneElement(child, getTriggerProps(child.props))
}

if (__DEV__) {
  PopoverTrigger.displayName = "PopoverTrigger"
}

export type PopoverContentProps = PropsOf<typeof chakra.section>

/**
 * PopoverContent
 *
 * The popover's content wrapper that includes all
 * accessibility requirements for a popover
 */
export const PopoverContent = React.forwardRef(function PopoverContent(
  props: PopoverContentProps,
  ref: React.Ref<any>,
) {
  const { getPopoverProps } = usePopoverContext()
  const popoverProps = getPopoverProps({ ...props, ref })
  const styles = useStyles()

  return (
    <chakra.section
      className="chakra-popover__content"
      {...popoverProps}
      __css={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        ...styles.content,
      }}
    />
  )
})

if (__DEV__) {
  PopoverContent.displayName = "PopoverContent"
}

export type PopoverHeaderProps = PropsOf<typeof chakra.header>

/**
 * Popover Header
 *
 * This servers as the accessible header or label
 * for the popover's content and it's first announced by screenreaders.
 */
export const PopoverHeader = React.forwardRef(function PopoverHeader(
  props: PopoverHeaderProps,
  ref: React.Ref<any>,
) {
  const { headerId, setHasHeader } = usePopoverContext()

  useSafeLayoutEffect(() => {
    setHasHeader.on()
    return () => setHasHeader.off()
  }, [])

  const styles = useStyles()

  return (
    <chakra.header
      className="chakra-popover__header"
      {...props}
      id={headerId}
      ref={ref}
      __css={styles.header}
    />
  )
})

if (__DEV__) {
  PopoverHeader.displayName = "PopoverHeader"
}

export type PopoverBodyProps = PropsOf<typeof chakra.div>

/**
 * PopoverBody
 *
 * Serves as the main content area for the popover. Should contain
 * at least one interactive element.
 */
export const PopoverBody = React.forwardRef(function PopoverBody(
  props: PopoverBodyProps,
  ref: React.Ref<any>,
) {
  const { bodyId, setHasBody } = usePopoverContext()

  useSafeLayoutEffect(() => {
    setHasBody.on()
    return () => setHasBody.off()
  }, [])

  const styles = useStyles()

  return (
    <chakra.div
      className="chakra-popover__body"
      {...props}
      id={bodyId}
      ref={ref}
      __css={styles.body}
    />
  )
})

if (__DEV__) {
  PopoverBody.displayName = "PopoverBody"
}

export function PopoverFooter(props: PropsOf<typeof chakra.footer>) {
  const styles = useStyles()
  return (
    <chakra.footer
      className="chakra-popover__footer"
      {...props}
      __css={styles.footer}
    />
  )
}

if (__DEV__) {
  PopoverFooter.displayName = "PopoverFooter"
}

export type PopoverCloseButtonProps = CloseButtonProps

/**
 * PopoverCloseButton
 *
 * The button to close the popover
 */
export function PopoverCloseButton(props: CloseButtonProps) {
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

export type PopoverArrowProps = PropsOf<typeof chakra.div>

export function PopoverArrow(props: PopoverArrowProps) {
  const { getArrowProps } = usePopoverContext()
  const styles = useStyles()
  return (
    <chakra.div
      className="chakra-popover__arrow"
      {...getArrowProps(props)}
      __css={{
        bg: "inherit",
        ...styles.arrow,
      }}
    />
  )
}

if (__DEV__) {
  PopoverArrow.displayName = "PopoverArrow"
}
