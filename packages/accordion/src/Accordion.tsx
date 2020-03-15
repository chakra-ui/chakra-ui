import { PropsOf, createChakra } from "@chakra-ui/system"
import { Omit, createContext } from "@chakra-ui/utils"
import { ChevronDownIcon, IconProps } from "@chakra-ui/icons"
import * as React from "react"
import {
  AccordionHookProps,
  AccordionItemHookProps,
  useAccordion,
  useAccordionItem,
  AccordionHookReturn,
  AccordionItemHookReturn,
} from "./Accordion.hook"
import { Collapse } from "@chakra-ui/collapse"

type AccordionContext = Omit<AccordionHookReturn, "children" | "htmlProps">

const [AccordionCtxProvider, useAccordionContext] = createContext<
  AccordionContext
>()

const StyledAccordion = createChakra("div", {
  themeKey: "Accordion.Root",
})
export type AccordionProps = AccordionHookProps &
  Omit<PropsOf<typeof StyledAccordion>, "onChange">

export function Accordion(props: AccordionProps) {
  const { children, htmlProps, ...context } = useAccordion(props)
  return (
    <AccordionCtxProvider value={context}>
      <StyledAccordion data-chakra-accordion="" {...htmlProps}>
        {children}
      </StyledAccordion>
    </AccordionCtxProvider>
  )
}

type AccordionItemContext = Omit<AccordionItemHookReturn, "htmlProps">

const [AccordionItemProvider, useAccordionItemContext] = createContext<
  AccordionItemContext
>()

export function useAccordionItemState() {
  const { isOpen, onClose, onOpen } = useAccordionItemContext()
  return { isOpen, onClose, onOpen }
}

export type AccordionItemProps = PropsOf<typeof StyledAccordionItem> &
  Omit<AccordionItemHookProps, "context">

export function AccordionItem(props: AccordionItemProps) {
  const accordionContext = useAccordionContext()
  const { htmlProps, ...context } = useAccordionItem({
    ...props,
    context: accordionContext,
  })
  return (
    <AccordionItemProvider value={context}>
      <StyledAccordionItem data-chakra-accordion-item="" {...htmlProps} />
    </AccordionItemProvider>
  )
}

const StyledAccordionItem = createChakra("div", {
  themeKey: "Accordion.Item",
})

const StyledAccordionButton = createChakra("button", {
  themeKey: "Accordion.Button",
  baseStyle: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    transition: "all 0.2s",
    outline: 0,
  },
})

export type AccordionButtonProps = PropsOf<typeof StyledAccordionButton>

export function AccordionButton(props: AccordionButtonProps) {
  const { getButtonProps } = useAccordionItemContext()
  return (
    <StyledAccordionButton
      data-chakra-accordion-button=""
      {...getButtonProps(props as any)}
    />
  )
}

const StyledAccordionPanel = createChakra("div", {
  themeKey: "Accordion.Panel",
})

export type AccordionPanelProps = PropsOf<typeof StyledAccordionPanel>

export function AccordionPanel(props: AccordionPanelProps) {
  const { getPanelProps, isOpen } = useAccordionItemContext()
  // remove hidden prop, 'coz we're using collapse height transition
  const { hidden, ...panelProps } = getPanelProps(props)

  return (
    <Collapse isOpen={isOpen}>
      <StyledAccordionPanel data-chakra-accordion-panel="" {...panelProps} />
    </Collapse>
  )
}

export type AccordionIconProps = IconProps

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
