import { PropsOf } from "@chakra-ui/system"
import { Omit } from "@chakra-ui/utils"
import { createContext } from "@chakra-ui/utils/src"
import * as React from "react"
import {
  AccordionHookProps,
  AccordionItemHookProps,
  useAccordion,
  useAccordionItem,
  AccordionHookReturn,
  AccordionItemHookReturn,
} from "./Accordion.hook"

type AccordionContext = Omit<AccordionHookReturn, "children" | "htmlProps">
const [AccordionCtxProvider, useAccordionCtx] = createContext<
  AccordionContext
>()

export type BaseAccordionProps = AccordionHookProps &
  Omit<PropsOf<"div">, "onChange">

export function BaseAccordion(props: BaseAccordionProps) {
  const { children, htmlProps, ...context } = useAccordion(props)
  return (
    <AccordionCtxProvider value={context}>
      <div data-chakra-accordion="" {...htmlProps}>
        {children}
      </div>
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

export type BaseAccordionItemProps = PropsOf<"div"> &
  Omit<AccordionItemHookProps, "context">

export function BaseAccordionItem(props: BaseAccordionItemProps) {
  const accordionContext = useAccordionCtx()
  const { htmlProps, ...context } = useAccordionItem({
    ...props,
    context: accordionContext,
  })
  return (
    <AccordionItemProvider value={context}>
      <div data-chakra-accordion-item="" {...htmlProps} />
    </AccordionItemProvider>
  )
}

export type BaseAccordionButtonProps = PropsOf<"button">
export function BaseAccordionButton(props: BaseAccordionButtonProps) {
  const { getButtonProps } = useAccordionItemContext()
  return <button data-chakra-accordion-button="" {...getButtonProps(props)} />
}

export type BaseAccordionPanelProps = PropsOf<"div">
export function BaseAccordionPanel(props: BaseAccordionPanelProps) {
  const { getPanelProps } = useAccordionItemContext()
  return <div data-chakra-accordion-panel="" {...getPanelProps(props)} />
}
