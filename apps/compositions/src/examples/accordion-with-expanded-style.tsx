import { Accordion, Span } from "@chakra-ui/react"

export const AccordionWithExpandedStyle = () => {
  return (
    <Accordion.Root collapsible defaultValue={["b"]}>
      {items.map((item, index) => (
        <Accordion.Item key={index} value={item.value}>
          <Accordion.ItemTrigger px="3" _open={{ bg: "gray.subtle" }}>
            <Span flex="1">{item.title}</Span>
            <Accordion.ItemIndicator />
          </Accordion.ItemTrigger>
          <Accordion.ItemContent>
            <Accordion.ItemBody>{item.text}</Accordion.ItemBody>
          </Accordion.ItemContent>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  )
}

const items = [
  {
    value: "a",
    title: "First Item",
    text: "Click the accordion button to see a different style when expanded.",
  },
  {
    value: "b",
    title: "Second Item",
    text: "The trigger background changes to teal with white text when expanded.",
  },
  {
    value: "c",
    title: "Third Item",
    text: "You can use any style props with the _open pseudo selector.",
  },
]
