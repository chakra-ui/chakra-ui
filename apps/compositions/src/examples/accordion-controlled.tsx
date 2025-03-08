"use client"

import { Accordion, Span, Stack, Text } from "@chakra-ui/react"
import { useState } from "react"

export const AccordionControlled = () => {
  const [value, setValue] = useState(["second-item"])
  return (
    <Stack gap="4">
      <Text fontWeight="medium">Expanded: {value.join(", ")}</Text>
      <Accordion.Root value={value} onValueChange={(e) => setValue(e.value)}>
        {items.map((item, index) => (
          <Accordion.Item key={index} value={item.value}>
            <Accordion.ItemTrigger>
              <Span flex="1">{item.title}</Span>
              <Accordion.ItemIndicator />
            </Accordion.ItemTrigger>
            <Accordion.ItemContent>
              <Accordion.ItemBody>{item.text}</Accordion.ItemBody>
            </Accordion.ItemContent>
          </Accordion.Item>
        ))}
      </Accordion.Root>
    </Stack>
  )
}

const items = [
  { value: "first-item", title: "First Item", text: "Some value 1..." },
  { value: "second-item", title: "Second Item", text: "Some value 2..." },
  { value: "third-item", title: "Third Item", text: "Some value 3..." },
]
