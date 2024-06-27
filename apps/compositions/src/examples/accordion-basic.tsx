import { Accordion } from "compositions/ui/accordion"

const items = [
  { value: "a", title: "First Item", text: "Some value 1..." },
  { value: "b", title: "Second Item", text: "Some value 2..." },
  { value: "c", title: "Third Item", text: "Some value 3..." },
]

export const AccordionBasic = () => {
  return (
    <Accordion items={items} collapsible minW="300px" defaultValue={["b"]} />
  )
}
