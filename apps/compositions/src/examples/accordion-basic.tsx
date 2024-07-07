import { Accordion, Box } from "@chakra-ui/react"
import { LuChevronDown } from "react-icons/lu"

const items = [
  { value: "a", title: "First Item", text: "Some value 1..." },
  { value: "b", title: "Second Item", text: "Some value 2..." },
  { value: "c", title: "Third Item", text: "Some value 3..." },
]

export const AccordionBasic = () => {
  return (
    <Accordion.Root collapsible minW="300px" defaultValue={["b"]}>
      {items.map((item, index) => (
        <Accordion.Item key={index} value={item.value}>
          <h2>
            <Accordion.ItemTrigger>
              <Box flex="1" textAlign="start">
                {item.title}
              </Box>
              <Accordion.ItemIndicator>
                <LuChevronDown />
              </Accordion.ItemIndicator>
            </Accordion.ItemTrigger>
          </h2>
          <Accordion.ItemContent>
            <Accordion.ItemBody>{item.text}</Accordion.ItemBody>
          </Accordion.ItemContent>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  )
}
