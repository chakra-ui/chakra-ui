import { Accordion, Stack, Text } from "@chakra-ui/react"
import { LoremIpsum } from "react-lorem-ipsum"

const items = [
  { value: "a", title: "First Item", text: <LoremIpsum p={1} /> },
  { value: "b", title: "Second Item", text: <LoremIpsum p={1} /> },
  { value: "c", title: "Third Item", text: <LoremIpsum p={1} /> },
]

export const AccordionWithSubtext = () => {
  return (
    <Accordion.Root collapsible>
      {items.map((item, index) => (
        <Accordion.Item key={index} value={item.value}>
          <Accordion.ItemTrigger>
            <Stack gap="1">
              <Text>{item.title}</Text>
              <Text fontSize="sm" color="fg.muted">
                Click to expand
              </Text>
            </Stack>
          </Accordion.ItemTrigger>
          <Accordion.ItemContent>
            <Accordion.ItemBody>{item.text}</Accordion.ItemBody>
          </Accordion.ItemContent>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  )
}
