"use client"

import { AbsoluteCenter, Menu as ChakraMenu, Portal } from "@chakra-ui/react"
import { forwardRef } from "react"
import { LuCheck, LuChevronRight } from "react-icons/lu"

interface MenuContentProps extends ChakraMenu.ContentProps {
  portalled?: boolean
  containerRef?: React.RefObject<HTMLElement>
  showArrow?: boolean
}

export const MenuContent = forwardRef<HTMLDivElement, MenuContentProps>(
  function MenuContent(props, ref) {
    const {
      children,
      portalled = true,
      containerRef,
      showArrow,
      ...rest
    } = props

    return (
      <Portal disabled={!portalled} container={containerRef}>
        <ChakraMenu.Positioner>
          <ChakraMenu.Content ref={ref} {...rest} asChild={false}>
            {showArrow && (
              <ChakraMenu.Arrow>
                <ChakraMenu.ArrowTip />
              </ChakraMenu.Arrow>
            )}
            {children}
          </ChakraMenu.Content>
        </ChakraMenu.Positioner>
      </Portal>
    )
  },
)

export const MenuCheckboxItem = (props: ChakraMenu.CheckboxItemProps) => {
  return (
    <ChakraMenu.CheckboxItem {...props}>
      <ChakraMenu.ItemIndicator hidden={false}>
        <LuCheck />
      </ChakraMenu.ItemIndicator>
      {props.children}
    </ChakraMenu.CheckboxItem>
  )
}

export const MenuRadioItem = (props: ChakraMenu.RadioItemProps) => {
  const { children, ...rest } = props
  return (
    <ChakraMenu.RadioItem ps="8" {...rest}>
      <AbsoluteCenter axis="horizontal" left="4" asChild>
        <ChakraMenu.ItemIndicator>
          <LuCheck />
        </ChakraMenu.ItemIndicator>
      </AbsoluteCenter>
      <ChakraMenu.ItemText>{children}</ChakraMenu.ItemText>
    </ChakraMenu.RadioItem>
  )
}

export const MenuTrigger = (props: ChakraMenu.TriggerProps) => {
  return <ChakraMenu.Trigger {...props} asChild />
}

export const MenuRoot = ChakraMenu.Root
export const MenuSeparator = ChakraMenu.Separator

export interface MenuItemProps extends ChakraMenu.ItemProps {
  startIcon?: React.ReactNode
  endIcon?: React.ReactNode
  command?: string
}

export const MenuItem = forwardRef<HTMLDivElement, MenuItemProps>(
  function MenuItem(props, ref) {
    const { startIcon, endIcon, command, children, ...rest } = props
    return (
      <ChakraMenu.Item ref={ref} {...rest}>
        {startIcon}
        {children}
        {endIcon}
        {command && <ChakraMenu.ItemCommand>{command}</ChakraMenu.ItemCommand>}
      </ChakraMenu.Item>
    )
  },
)

export interface MenuTriggerItemProps extends ChakraMenu.ItemProps {
  startIcon?: React.ReactNode
}

export const MenuTriggerItem = forwardRef<HTMLDivElement, MenuTriggerItemProps>(
  function MenuTriggerItem(props, ref) {
    const { startIcon, children, ...rest } = props
    return (
      <ChakraMenu.TriggerItem ref={ref} {...rest}>
        {startIcon}
        {children}
        <LuChevronRight />
      </ChakraMenu.TriggerItem>
    )
  },
)

export const MenuRadioItemGroup = ChakraMenu.RadioItemGroup

export const MenuContextTrigger = forwardRef<
  HTMLDivElement,
  ChakraMenu.ContextTriggerProps
>(function ContextTrigger(props, ref) {
  return <ChakraMenu.ContextTrigger ref={ref} {...props} asChild />
})
