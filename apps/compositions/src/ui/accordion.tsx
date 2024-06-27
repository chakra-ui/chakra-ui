import { Box, Accordion as ChakraAccordion, Icon } from "@chakra-ui/react"
import { forwardRef } from "react"
import { HiChevronDown } from "react-icons/hi"

export interface AccordionProps extends ChakraAccordion.RootProps {
  items: Array<{ value: string; title: string; text: string }>
}

export const Accordion = forwardRef<HTMLDivElement, AccordionProps>(
  function Accordion(props, ref) {
    const { items, ...rest } = props

    return (
      <ChakraAccordion.Root ref={ref} {...rest}>
        {items.map((item, index) => (
          <ChakraAccordion.Item key={index} value={item.value}>
            <h2>
              <ChakraAccordion.ItemTrigger>
                <Box flex="1" textAlign="start">
                  {item.title}
                </Box>
                <ChakraAccordion.ItemIndicator>
                  <HiChevronDown />
                </ChakraAccordion.ItemIndicator>
              </ChakraAccordion.ItemTrigger>
            </h2>
            <ChakraAccordion.ItemContent>
              <ChakraAccordion.ItemBody>{item.text}</ChakraAccordion.ItemBody>
            </ChakraAccordion.ItemContent>
          </ChakraAccordion.Item>
        ))}
      </ChakraAccordion.Root>
    )
  },
)
