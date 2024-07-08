import { Editable } from "@chakra-ui/react"

export const EditableWithDoubleClick = () => (
  <Editable.Root
    textAlign="start"
    defaultValue="Double click to edit"
    fontSize="xl"
    activationMode="dblclick"
  >
    <Editable.Preview />
    <Editable.Input />
  </Editable.Root>
)
