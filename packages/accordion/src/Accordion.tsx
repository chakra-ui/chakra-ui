import { Collapse } from "@chakra-ui/collapse"
import { ChevronDownIcon, IconProps } from "@chakra-ui/icons"
import { chakra, PropsOf } from "@chakra-ui/system"
import {
  createContext,
  isFunction,
  NodeOrRenderProp,
  Omit,
  __DEV__,
} from "@chakra-ui/utils"
import React, { forwardRef } from "react"
import {
  AccordionHookProps,
  AccordionHookReturn,
  AccordionItemHookProps,
  AccordionItemHookReturn,
  useAccordion,
  useAccordionItem,
} from "./Accordion.hook"

type AccordionContext = Omit<AccordionHookReturn, "children" | "htmlProps">

const [AccordionCtxProvider, useAccordionContext] = createContext<
  AccordionContext
>()

/**
 * Theming
 *
 * To style the wrapper `div` of the accordion,change the styles in
 * `theme.components.Accordion` under the `Root` key
 */
const StyledRoot = chakra("div", {
  themeKey: "Accordion.Root",
})

export type AccordionProps = AccordionHookProps &
  Omit<PropsOf<typeof StyledRoot>, "onChange">

/**
 * Accordion
 *
 * The wrapper that provides context and focus management
 * for all accordion items.
 *
 * It wraps all accordion items in a `div` for better grouping.
 */
export function Accordion(props: AccordionProps) {
  const { children, htmlProps, ...context } = useAccordion(props)
  return (
    <AccordionCtxProvider value={context}>
      <StyledRoot data-chakra-accordion="" {...htmlProps}>
        {children}
      </StyledRoot>
    </AccordionCtxProvider>
  )
}

if (__DEV__) {
  Accordion.displayName = "Accordion"
}

///////////////////////////////////////////////////////////////////////////

type AccordionItemContext = Omit<AccordionItemHookReturn, "getRootProps">

const [AccordionItemCtxProvider, useAccordionItemContext] = createContext<
  AccordionItemContext
>()

/**
 * Theming
 *
 * To style the wrapper `div` of the accordion item,change the styles in
 * `theme.components.Accordion` under the `Item` key
 */
const StyledItem = chakra("div", {
  themeKey: "Accordion.Item",
  pure: true,
})

export type AccordionItemProps = Omit<PropsOf<typeof StyledItem>, "children"> &
  Omit<AccordionItemHookProps, "context"> & {
    children?: NodeOrRenderProp<{ isExpanded: boolean; isDisabled: boolean }>
  }

/**
 * AccordionItem
 *
 * This represents a single accordion and provides the open-close
 * behavior when the accordion button is clicked.
 *
 * It also provides context for the accordion button and panel.
 */
export const AccordionItem = forwardRef(
  (props: AccordionItemProps, ref: React.Ref<any>) => {
    const accordionContext = useAccordionContext()

    const { getRootProps, ...context } = useAccordionItem({
      ...props,
      context: accordionContext,
    })

    const { children } = props

    return (
      <AccordionItemCtxProvider value={context}>
        <StyledItem data-chakra-accordion-item="" {...getRootProps({ ref })}>
          {isFunction(children)
            ? children({
                isExpanded: !!context.isOpen,
                isDisabled: !!context.isDisabled,
              })
            : children}
        </StyledItem>
      </AccordionItemCtxProvider>
    )
  },
)

if (__DEV__) {
  AccordionItem.displayName = "AccordionItem"
}

/**
 * React hook to get the state and actions of an accordion item
 */
export function useAccordionItemState() {
  const { isOpen, isDisabled, onClose, onOpen } = useAccordionItemContext()
  return { isOpen, onClose, isDisabled, onOpen }
}

///////////////////////////////////////////////////////////////////////////

/**
 * Theming
 *
 * To style all accordion buttons, change the styles in
 * `theme.components.Accordion` under the `Button` key
 */
const StyledButton = chakra("button", {
  themeKey: "Accordion.Button",
  baseStyle: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    transition: "all 0.2s",
    outline: 0,
  },
})

export type AccordionButtonProps = PropsOf<typeof StyledButton>

/**
 * AccordionButton
 *
 * The button that expands and collapses an accordion item.
 * It must be a child of `AccordionItem`.
 *
 * Note 🚨: Each accordion button must be wrapped in an heading tag,
 * that is appropriate for the information architecture of the page.
 */
export const AccordionButton = forwardRef(
  (props: AccordionButtonProps, ref: React.Ref<any>) => {
    const { getButtonProps } = useAccordionItemContext()
    return (
      <StyledButton
        data-chakra-accordion-button=""
        {...getButtonProps({ ...props, ref })}
      />
    )
  },
)

if (__DEV__) {
  AccordionButton.displayName = "AccordionButton"
}

///////////////////////////////////////////////////////////////////////////

/**
 * Theming
 *
 * To style all accordion panels,change the styles in
 * `theme.components.Accordion` under the `Panel` key
 */
const StyledPanel = chakra("div", {
  themeKey: "Accordion.Panel",
})

export type AccordionPanelProps = PropsOf<typeof StyledPanel>

/**
 * AccordionPanel
 *
 * The panel that holds the content for each accordion.
 * It shows and hides based on the state login from the `AccordionItem`.
 *
 * It uses the `Collapse` component to animate it's height.
 */
export const AccordionPanel = forwardRef(
  (props: AccordionPanelProps, ref: React.Ref<any>) => {
    const { getPanelProps, isOpen } = useAccordionItemContext()
    /**
     * remove `hidden` prop, 'coz we're using height animation
     */
    const { hidden, ...panelProps } = getPanelProps({ ...props, ref })

    return (
      <Collapse isOpen={isOpen}>
        <StyledPanel data-chakra-accordion-panel="" {...panelProps} />
      </Collapse>
    )
  },
)

if (__DEV__) {
  AccordionPanel.displayName = "AccordionPanel"
}

///////////////////////////////////////////////////////////////////////////

export type AccordionIconProps = IconProps

/**
 * AccordionIcon
 *
 * The icon that gives a visual cue of the open/close state of the accordion item.
 *
 * It rotates `180deg` based on the open/close state.
 */
export function AccordionIcon(props: AccordionIconProps) {
  const { isOpen, isDisabled } = useAccordionItemContext()
  return (
    <ChevronDownIcon
      aria-hidden
      focusable="false"
      size="1.25em"
      opacity={isDisabled ? 0.4 : 1}
      transform={isOpen ? "rotate(-180deg)" : undefined}
      transition="transform 0.2s"
      transformOrigin="center"
      {...props}
    />
  )
}

if (__DEV__) {
  AccordionIcon.displayName = "AccordionIcon"
}
