import { Accordion } from "@chakra-ui/react"

export function MyAccordion() {
  return (
    <Accordion.Root>
      <Accordion.Item value="item-1">
        <Accordion.ItemTrigger asChild>
          <button>Trigger</button>
        </Accordion.ItemTrigger>
        <Accordion.ItemContent>
          <p>Content</p>
        </Accordion.ItemContent>
      </Accordion.Item>
    </Accordion.Root>
  )
}
