import { AbsoluteCenter, Box, Button } from "@chakra-ui/react"
import {
  AccordionItem,
  AccordionItemContent,
  AccordionItemTrigger,
  AccordionRoot,
} from "compositions/ui/accordion"
import LoremIpsum from "react-lorem-ipsum"

export const AccordionWithActions = () => {
  return (
    <AccordionRoot spaceY="4" variant="plain" collapsible defaultValue={["b"]}>
      {items.map((item, index) => (
        <AccordionItem key={index} value={item.value}>
          <Box position="relative">
            <AccordionItemTrigger indicatorPlacement="start">
              {item.title}
            </AccordionItemTrigger>
            <AbsoluteCenter axis="vertical" insetEnd="0">
              <Button variant="subtle" colorPalette="blue">
                Action
              </Button>
            </AbsoluteCenter>
          </Box>
          <AccordionItemContent>{item.text}</AccordionItemContent>
        </AccordionItem>
      ))}
    </AccordionRoot>
  )
}

const items = [
  { value: "a", title: "First Item", text: <LoremIpsum /> },
  { value: "b", title: "Second Item", text: <LoremIpsum /> },
  { value: "c", title: "Third Item", text: <LoremIpsum /> },
]
