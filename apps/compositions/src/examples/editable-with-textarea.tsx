import { Editable } from "@chakra-ui/react"

export const EditableWithTextarea = () => {
  return (
    <Editable.Root defaultValue="Click to edit">
      <Editable.Preview minH="48px" alignItems="flex-start" width="full" />
      <Editable.Textarea />
    </Editable.Root>
  )
}
