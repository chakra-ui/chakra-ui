import { CloseButton, CloseButtonProps } from "@chakra-ui/close-button"
import { useSafeLayoutEffect } from "@chakra-ui/hooks"
import { Portal } from "@chakra-ui/portal"
import { chakra, PropsOf } from "@chakra-ui/system"
import {
  createContext,
  isFunction,
  ReactNodeOrRenderProp,
  __DEV__,
} from "@chakra-ui/utils"
import * as React from "react"
import { usePopover, UsePopoverProps, UsePopoverReturn } from "./use-popover"

const [PopoverCtxProvider, usePopoverContext] = createContext<UsePopoverReturn>(
  {
    name: "PopoverContext",
  },
)

export type PopoverProps = UsePopoverProps & {
  /**
   * The content of the popover. It's usually the `PopoverTrigger`,
   * and `PopoverContent`
   */
  children?: ReactNodeOrRenderProp<{ isOpen: boolean; onClose(): void }>
}

/**
 * Popover
 *
 * React component used to Popovers are used to bring attention
 * to specific user interface elements, typically to suggest an
 * action or to guide users through a new experience.
 */
export const Popover = (props: PopoverProps) => {
  const { children, ...hookProps } = props
  const context = usePopover(hookProps)

  return (
    <PopoverCtxProvider value={context}>
      {isFunction(children)
        ? children({ isOpen: context.isOpen, onClose: context.onClose })
        : children}
    </PopoverCtxProvider>
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

/**
 * Theming
 *
 * To change the global styles of Popover Content,
 * go to `theme.components.Popover` under the `Content` key
 */
const StyledContent = chakra("section", {
  themeKey: "Popover.Content",
  baseStyle: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
  },
})

export type PopoverContentProps = PropsOf<typeof StyledContent>

/**
 * PopoverContent
 *
 * The popover's content wrapper that includes all
 * accessibility requirements for a popover
 */
export const PopoverContent = React.forwardRef(
  (props: PopoverContentProps, ref: React.Ref<any>) => {
    const { getPopoverProps } = usePopoverContext()

    return (
      <StyledContent
        data-chakra-popover-content=""
        {...getPopoverProps({ ...props, ref })}
      />
    )
  },
)

if (__DEV__) {
  PopoverContent.displayName = "PopoverContent"
}

/**
 * Theming
 *
 * To change the global styles of Popover Header,
 * go to `theme.components.Popover` under the `Header` key
 */
const StyledHeader = chakra("header", {
  themeKey: "Popover.Header",
})

export type PopoverHeaderProps = PropsOf<typeof StyledHeader>

/**
 * Popover Header
 *
 * This servers as the accessible header or label
 * for the popover's content and it's first announced by
 * screenreaders.
 */
export const PopoverHeader = React.forwardRef(
  (props: PopoverHeaderProps, ref: React.Ref<any>) => {
    const { headerId, setHasHeader } = usePopoverContext()

    useSafeLayoutEffect(() => {
      setHasHeader.on()
      return () => setHasHeader.off()
    }, [])

    return (
      <StyledHeader
        data-chakra-popover-header=""
        {...props}
        id={headerId}
        ref={ref}
      />
    )
  },
)

if (__DEV__) {
  PopoverHeader.displayName = "PopoverHeader"
}

export type PopoverBodyProps = PropsOf<typeof StyledBody>

/**
 * Theming
 *
 * To change the global styles of Popover Body,
 * go to `theme.components.Popover` under the `Body` key
 */
const StyledBody = chakra("div", {
  themeKey: "Popover.Body",
})

/**
 * PopoverBody
 *
 * Serves as the main content area for the popover. Should contain
 * at least one interactive element.
 */
export const PopoverBody = React.forwardRef(
  (props: PopoverBodyProps, ref: React.Ref<any>) => {
    const { bodyId, setHasBody } = usePopoverContext()

    useSafeLayoutEffect(() => {
      setHasBody.on()
      return () => setHasBody.off()
    }, [])

    return <StyledBody {...props} id={bodyId} ref={ref} />
  },
)

if (__DEV__) {
  PopoverBody.displayName = "PopoverBody"
}

export const PopoverFooter = chakra("footer", { themeKey: "Popover.Footer" })

export type PopoverCloseButtonProps = CloseButtonProps

/**
 * PopoverCloseButton
 *
 * The button to close the popover
 */
export const PopoverCloseButton = (props: CloseButtonProps) => {
  const { onClose } = usePopoverContext()
  return (
    <CloseButton
      size="sm"
      onClick={onClose}
      position="absolute"
      borderRadius="md"
      top={1}
      right={2}
      padding={2}
      {...props}
    />
  )
}

if (__DEV__) {
  PopoverCloseButton.displayName = "PopoverCloseButton"
}

const StyledArrow = chakra("div", {
  themeKey: "Popover.Arrow",
})

export type PopoverArrowProps = PropsOf<typeof StyledArrow>

export const PopoverArrow = (props: PopoverArrowProps) => {
  const { getArrowProps } = usePopoverContext()
  return <StyledArrow bg="inherit" {...getArrowProps(props)} />
}

if (__DEV__) {
  PopoverArrow.displayName = "PopoverArrow"
}
