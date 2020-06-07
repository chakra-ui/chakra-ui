import { Collapse } from "@chakra-ui/collapse"
import { ChevronDownIcon, IconProps } from "@chakra-ui/icons"
import { chakra, PropsOf, forwardRef } from "@chakra-ui/system"
import {
  createContext,
  isFunction,
  ReactNodeOrRenderProp,
  Omit,
  __DEV__,
  cx,
} from "@chakra-ui/utils"
import * as React from "react"
import {
  UseAccordionProps,
  UseAccordionItemProps,
  UseAccordionItemReturn,
  useAccordion,
  useAccordionItem,
  AccordionContextProvider,
} from "./use-accordion"

/**
 * Theming
 *
 * To style the wrapper `div` of the accordion,change the styles in
 * `theme.components.Accordion` under the `Root` key
 */
const StyledRoot = chakra("div", {
  themeKey: "Accordion.Root",
})

export type AccordionProps = UseAccordionProps &
  Omit<PropsOf<typeof StyledRoot>, "onChange">

/**
 * Accordion
 *
 * The wrapper that provides context and focus management
 * for all accordion items.
 *
 * It wraps all accordion items in a `div` for better grouping.
 * @see Docs https://chakra-ui.com/components/accordion
 */
export const Accordion = forwardRef<AccordionProps, "div">((props, ref) => {
  const { children, htmlProps, ...context } = useAccordion(props)

  const _className = cx("chakra-accordion", props.className)

  return (
    <AccordionContextProvider value={context}>
      <StyledRoot ref={ref} {...htmlProps} className={_className}>
        {children}
      </StyledRoot>
    </AccordionContextProvider>
  )
})

if (__DEV__) {
  Accordion.displayName = "Accordion"
}

type AccordionItemContext = Omit<UseAccordionItemReturn, "getRootProps">

const [AccordionItemContextProvider, useAccordionItemContext] = createContext<
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
})

export type AccordionItemProps = Omit<PropsOf<typeof StyledItem>, "children"> &
  Omit<UseAccordionItemProps, "context"> & {
    children?: ReactNodeOrRenderProp<{
      isExpanded: boolean
      isDisabled: boolean
    }>
  }

/**
 * AccordionItem
 *
 * This represents a single accordion and provides the open-close
 * behavior when the accordion button is clicked.
 *
 * It also provides context for the accordion button and panel.
 */
export const AccordionItem = forwardRef<AccordionItemProps, "div">(
  function AccordionItem(props, ref) {
    const { children, className } = props
    const { getRootProps, ...context } = useAccordionItem(props)

    const _className = cx("chakra-accordion__item", className)

    return (
      <AccordionItemContextProvider value={context}>
        <StyledItem {...getRootProps({ ref })} className={_className}>
          {isFunction(children)
            ? children({
                isExpanded: !!context.isOpen,
                isDisabled: !!context.isDisabled,
              })
            : children}
        </StyledItem>
      </AccordionItemContextProvider>
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
export const AccordionButton = forwardRef<AccordionButtonProps, "button">(
  function AccordionButton(props, ref) {
    const _className = cx("chakra-accordion__button", props.className)
    const { getButtonProps } = useAccordionItemContext()
    const buttonProps = getButtonProps({ ...props, ref })
    return <StyledButton {...buttonProps} className={_className} />
  },
)

if (__DEV__) {
  AccordionButton.displayName = "AccordionButton"
}

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
export const AccordionPanel = forwardRef<AccordionPanelProps, "div">(
  function AccordionPanel(props, ref) {
    const { getPanelProps, isOpen } = useAccordionItemContext()
    /**
     * remove `hidden` prop, 'coz we're using height animation
     */
    const { hidden, ...panelProps } = getPanelProps({ ...props, ref })

    const _className = cx("chakra-accordion__panel", props.className)

    return (
      <Collapse isOpen={isOpen}>
        <StyledPanel
          {...panelProps}
          className={_className}
          transition="height 150ms ease-in-out, opacity 150ms ease-in-out, transform 150ms ease-in-out"
        />
      </Collapse>
    )
  },
)

if (__DEV__) {
  AccordionPanel.displayName = "AccordionPanel"
}

/**
 * AccordionIcon
 *
 * The icon that gives a visual cue of the open/close state of the accordion item.
 * It rotates `180deg` based on the open/close state.
 */
export function AccordionIcon(props: IconProps) {
  const { isOpen, isDisabled } = useAccordionItemContext()
  return (
    <ChevronDownIcon
      aria-hidden
      focusable="false"
      width="1.25em"
      height="1.25em"
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
