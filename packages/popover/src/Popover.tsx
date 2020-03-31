import * as React from "react"
import { PopoverHookReturn, PopoverHookProps, usePopover } from "./Popover.hook"
import { createContext, NodeOrRenderProp, isFunction } from "@chakra-ui/utils"
import { chakra, PropsOf } from "@chakra-ui/system"
import { Portal } from "@chakra-ui/portal"
import { useSafeLayoutEffect } from "@chakra-ui/hooks"
import { CloseButton } from "@chakra-ui/close-button"

const [PopoverCtxProvider, usePopoverContext] = createContext<
  PopoverHookReturn
>()

export type PopoverProps = PopoverHookProps & {
  /**
   * If `true` the popover content will be displayed within a Portal.
   */
  usePortal?: boolean
  /**
   * The content of the popover. It's usually the `PopoverTrigger`,
   * and `PopoverContent`
   */
  children?: NodeOrRenderProp<{ isOpen: boolean; onClose(): void }>
}

/**
 * Popover
 *
 * React component used to Popovers are used to bring attention
 * to specific user interface elements, typically to suggest an
 * action or to guide users through a new experience.
 */
export const Popover = (props: PopoverProps) => {
  const { children } = props
  const context = usePopover(props)

  return (
    <PopoverCtxProvider value={context}>
      {isFunction(children)
        ? children({ isOpen: context.isOpen, onClose: context.onClose })
        : children}
    </PopoverCtxProvider>
  )
}

/**
 * PopoverTrigger
 *
 * The trigger for the popover. It must be an interactive element
 * such as `button` or `a`.
 */
export type PopoverTriggerProps = { children?: React.ReactNode }

export const PopoverTrigger = (props: PopoverTriggerProps) => {
  const { children } = props

  // enforce a single child
  const child = React.Children.only(children) as React.ReactElement<any>

  const { getTriggerProps } = usePopoverContext()

  return React.cloneElement(child, getTriggerProps(child.props))
}

export type PopoverContentProps = PropsOf<typeof StyledContent> & {
  usePortal?: boolean
}

const StyledContent = chakra("section", {
  themeKey: "Popover.Content",
  baseStyle: {
    width: "100%",
    position: "relative",
    display: "flex",
    flexDirection: "column",
  },
})

/**
 * PopoverContent
 *
 * The popover's content wrapper that includes all
 * accessibility requirements for a popover
 */
export const PopoverContent = React.forwardRef(
  (props: PopoverContentProps, ref: React.Ref<any>) => {
    const { usePortal, ...rest } = props

    const { getPopoverProps } = usePopoverContext()

    const Wrapper = usePortal ? Portal : React.Fragment

    return (
      <Wrapper>
        <StyledContent
          data-chakra-popover-content=""
          {...getPopoverProps({ ...rest, ref })}
        />
      </Wrapper>
    )
  },
)

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

/**
 * PopoverCloseButton
 *
 * The button to close the popover
 */
export const PopoverCloseButton = (props: any) => {
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
