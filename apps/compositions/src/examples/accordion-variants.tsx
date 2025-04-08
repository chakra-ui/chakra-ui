import { Accordion, For, Span, Stack, Text } from "@chakra-ui/react"

export const AccordionVariants = () => {
  return (
    <Stack gap="8">
      <For each={["outline", "subtle", "enclosed", "plain"]}>
        {(variant) => (
          <Stack gap="2" key={variant}>
            <Text fontWeight="semibold">{variant}</Text>
            <Accordion.Root variant={variant} collapsible defaultValue={["b"]}>
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
