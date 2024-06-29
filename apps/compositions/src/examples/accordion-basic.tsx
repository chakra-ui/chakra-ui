import { Box } from "@chakra-ui/react"
import {
  Accordion,
  AccordionItem,
  AccordionItemBody,
  AccordionItemContent,
  AccordionItemTrigger,
} from "compositions/ui/accordion"

const items = [
  { value: "a", title: "First Item", text: "Some value 1..." },
  { value: "b", title: "Second Item", text: "Some value 2..." },
  { value: "c", title: "Third Item", text: "Some value 3..." },
]

export const AccordionBasic = () => {
  return (
    <Accordion collapsible minW="300px" defaultValue={["b"]}>
      {items.map((item, index) => (
        <AccordionItem key={index} value={item.value}>
          <h2>
            <AccordionItemTrigger>
              <Box flex="1" textAlign="start">
                {item.title}
              </Box>
            </AccordionItemTrigger>
          </h2>
          <AccordionItemContent>
            <AccordionItemBody>{item.text}</AccordionItemBody>
          </AccordionItemContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
