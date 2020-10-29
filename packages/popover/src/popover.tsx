import { CloseButton, CloseButtonProps } from "@chakra-ui/close-button"
import {
  chakra,
  forwardRef,
  omitThemingProps,
  StylesProvider,
  SystemStyleObject,
  ThemingProps,
  useMultiStyleConfig,
  useStyles,
  HTMLChakraProps,
} from "@chakra-ui/system"
import {
  createContext,
  cx,
  MaybeRenderProp,
  runIfFn,
  __DEV__,
} from "@chakra-ui/utils"
import { motion, Variants } from "framer-motion"
import * as React from "react"
import { usePopover, UsePopoverProps, UsePopoverReturn } from "./use-popover"

const motionVariants: Variants = {
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: {
      duration: 0.1,
      ease: [0.4, 0, 1, 1],
    },
    transitionEnd: {
      visibility: "hidden",
    },
  },
  enter: {
    visibility: "visible",
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.15,
      ease: [0, 0, 0.2, 1],
    },
  },
}

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
  children?: MaybeRenderProp<{
    isOpen: boolean
    onClose: () => void
    forceUpdate: (() => void) | null
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
          forceUpdate: context.forceUpdate,
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
  const child: any = React.Children.only(props.children)
  const { getTriggerProps } = usePopoverContext()
  return React.cloneElement(child, getTriggerProps(child.props, child.ref))
}

if (__DEV__) {
  PopoverTrigger.displayName = "PopoverTrigger"
}

export interface PopoverContentProps extends HTMLChakraProps<"section"> {}

const Motion = chakra(motion.section)

export const PopoverContent = forwardRef<PopoverContentProps, "section">(
  function PopoverContent(props, ref) {
    const {
      isOpen,
      getPopoverProps,
      onTransitionEnd,
      getPopoverPositionerProps,
    } = usePopoverContext()

    const styles = useStyles()
    const contentStyles: SystemStyleObject = {
      position: "relative",
      display: "flex",
      flexDirection: "column",
      ...styles.content,
    }

    const popoverProps: any = getPopoverProps(props, ref)

    return (
      <chakra.div __css={styles.popper} {...getPopoverPositionerProps()}>
        <Motion
          {...popoverProps}
          onUpdate={onTransitionEnd}
          className={cx("chakra-popover__content")}
          __css={contentStyles}
          variants={motionVariants}
          initial={false}
          animate={isOpen ? "enter" : "exit"}
        />
      </chakra.div>
    )
  },
)

if (__DEV__) {
  PopoverContent.displayName = "PopoverContent"
}

export interface PopoverHeaderProps extends HTMLChakraProps<"header"> {}

/**
 * PopoverHeader is the accessible header or label
 * for the popover's content and it's first announced by screenreaders.
 */
export const PopoverHeader = forwardRef<PopoverHeaderProps, "header">(
  function PopoverHeader(props, ref) {
    const { headerId, setHasHeader } = usePopoverContext()

    React.useEffect(() => {
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

export interface PopoverBodyProps extends HTMLChakraProps<"div"> {}

/**
 * PopoverBody is the main content area for the popover. Should contain
 * at least one interactive element.
 */
export const PopoverBody = forwardRef<PopoverBodyProps, "div">(
  function PopoverBody(props, ref) {
    const { bodyId, setHasBody } = usePopoverContext()

    React.useEffect(() => {
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
export interface PopoverFooterProps extends HTMLChakraProps<"footer"> {}

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

export interface PopoverArrowProps extends HTMLChakraProps<"div"> {}

export const PopoverArrow: React.FC<PopoverArrowProps> = (props) => {
  const { getArrowProps, getArrowPositionerProps } = usePopoverContext()
  const styles = useStyles()

  return (
    <chakra.div
      {...getArrowPositionerProps()}
      className={cx("chakra-popover__arrow-positioner", props.className)}
    >
      <chakra.div
        className={cx("chakra-popover__arrow", props.className)}
        {...getArrowProps(props)}
        __css={styles.arrow}
      />
    </chakra.div>
  )
}

if (__DEV__) {
  PopoverArrow.displayName = "PopoverArrow"
}
