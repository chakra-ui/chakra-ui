import { Box, Accordion as ChakraAccordion } from "@chakra-ui/react"
import { forwardRef } from "react"
import { HiChevronDown } from "react-icons/hi"

export interface AccordionProps extends ChakraAccordion.RootProps {}

export const Accordion = forwardRef<HTMLDivElement, AccordionProps>(
  function Accordion(props, ref) {
    const { children, ...rest } = props
    return (
      <ChakraAccordion.Root ref={ref} {...rest}>
        {children}
      </ChakraAccordion.Root>
    )
  },
)

export interface AccordionItemProps extends ChakraAccordion.ItemProps {}

export const AccordionItem = forwardRef<HTMLDivElement, AccordionItemProps>(
  function AccordionItem(props, ref) {
    const { children, ...rest } = props
    return (
      <ChakraAccordion.Item ref={ref} {...rest}>
        {children}
      </ChakraAccordion.Item>
    )
  },
)

export interface AccordionItemTriggerProps
  extends ChakraAccordion.ItemTriggerProps {}

export const AccordionItemTrigger = forwardRef<
  HTMLDivElement,
  AccordionItemTriggerProps
>(function AccordionItemTrigger(props, ref) {
  const { children, ...rest } = props
  return (
    <ChakraAccordion.ItemTrigger ref={ref} {...rest}>
      {children}
      <ChakraAccordion.ItemIndicator>
        <HiChevronDown />
      </ChakraAccordion.ItemIndicator>
    </ChakraAccordion.ItemTrigger>
  )
})

export const AccordionItemContent = ChakraAccordion.ItemContent
export const AccordionItemBody = ChakraAccordion.ItemBody
