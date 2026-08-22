import { Accordion, Box, useAccordionItemContext } from "@chakra-ui/react"
import { LuMinus, LuPlus } from "react-icons/lu"

export const AccordionWithContext = () => {
  return (
    <Accordion.Root collapsible defaultValue={["b"]}>
      {items.map((item) => (
        <Accordion.Item key={item.value} value={item.value}>
          {item.useContext ? (
            <ItemWithContext item={item} />
          ) : (
            <ItemBasic item={item} />
          )}
        </Accordion.Item>
      ))}
    </Accordion.Root>
  )
}

function ItemBasic({ item }: { item: (typeof items)[0] }) {
  return (
    <>
      <Accordion.ItemTrigger>
        <Box flex="1">{item.title}</Box>
        <Accordion.ItemIndicator />
      </Accordion.ItemTrigger>
      <Accordion.ItemContent>
        <Accordion.ItemBody>{item.text}</Accordion.ItemBody>
      </Accordion.ItemContent>
    </>
  )
}

function ItemWithContext({ item }: { item: (typeof items)[0] }) {
  const { expanded } = useAccordionItemContext()

  return (
    <>
      <Accordion.ItemTrigger>
        <Box flex="1">{item.title}</Box>
        {expanded ? <LuMinus /> : <LuPlus />}
      </Accordion.ItemTrigger>
      <Accordion.ItemContent>
        <Accordion.ItemBody>{item.text}</Accordion.ItemBody>
      </Accordion.ItemContent>
    </>
  )
}

const items = [
  {
    value: "a",
    title: "First Item (Standard)",
    text: "This item uses the standard ItemIndicator component.",
    useContext: false,
  },
  {
    value: "b",
    title: "Second Item (Custom Icons)",
    text: "This item uses useAccordionItemContext to show custom +/- icons based on open state.",
    useContext: true,
  },
  {
    value: "c",
    title: "Third Item (Standard)",
    text: "This item uses the standard ItemIndicator component.",
    useContext: false,
  },
]
