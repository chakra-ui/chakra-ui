import { For, Stack, Text } from "@chakra-ui/react"
import {
  AccordionItem,
  AccordionItemContent,
  AccordionItemTrigger,
  AccordionRoot,
} from "compositions/ui/accordion"

export const AccordionVariants = () => {
  return (
    <Stack gap="8">
      <For each={["outline", "subtle", "enclosed", "plain"]}>
        {(variant) => (
          <Stack gap="2">
            <Text fontWeight="semibold">{variant}</Text>
            <AccordionRoot
              variant={variant}
              key={variant}
              collapsible
              defaultValue={["b"]}
            >
              {items.map((item, index) => (
                <AccordionItem key={index} value={item.value}>
                  <AccordionItemTrigger>{item.title}</AccordionItemTrigger>
                  <AccordionItemContent>{item.text}</AccordionItemContent>
                </AccordionItem>
              ))}
            </AccordionRoot>
          </Stack>
        )}
      </For>
    </Stack>
  )
}

const items = [
  { value: "a", title: "First Item", text: "Some value 1..." },
  { value: "b", title: "Second Item", text: "Some value 2..." },
  { value: "c", title: "Third Item", text: "Some value 3..." },
]
