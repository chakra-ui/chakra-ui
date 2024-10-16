"use client"

import { Stack, Text } from "@chakra-ui/react"
import {
  AccordionItem,
  AccordionItemContent,
  AccordionItemTrigger,
  AccordionRoot,
} from "compositions/ui/accordion"
import { useState } from "react"

export const AccordionControlled = () => {
  const [value, setValue] = useState(["second-item"])
  return (
    <Stack gap="4">
      <Text fontWeight="medium">Expanded: {value.join(", ")}</Text>
      <AccordionRoot value={value} onValueChange={(e) => setValue(e.value)}>
        {items.map((item, index) => (
          <AccordionItem key={index} value={item.value}>
            <AccordionItemTrigger>{item.title}</AccordionItemTrigger>
            <AccordionItemContent>{item.text}</AccordionItemContent>
          </AccordionItem>
        ))}
      </AccordionRoot>
    </Stack>
  )
}

const items = [
  { value: "first-item", title: "First Item", text: "Some value 1..." },
  { value: "second-item", title: "Second Item", text: "Some value 2..." },
  { value: "third-item", title: "Third Item", text: "Some value 3..." },
]
