import * as React from "react"
import { PopoverHookReturn, PopoverHookProps, usePopover } from "./Popover.hook"
import { createContext, NodeOrRenderProp } from "@chakra-ui/utils"
import { chakra, PropsOf } from "@chakra-ui/system"
import { Portal } from "@chakra-ui/portal"
import { useSafeLayoutEffect } from "@chakra-ui/hooks"

type PopoverContext = PopoverHookReturn

const [PopoverCtxProvider, usePopoverContext] = createContext<PopoverContext>()

export type PopoverProps = PopoverHookProps & {
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
      {typeof children === "function"
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
})

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

const StyledHeader = chakra("header", {
  themeKey: "Popover.Header",
})

export type PopoverHeaderProps = PropsOf<typeof StyledHeader>

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
