import { Editable } from "@chakra-ui/react"

export const EditableWithTextarea = () => {
  return (
    <Editable.Root
      defaultValue="Click to edit"
      fontSize="xl"
      textAlign="start"
      submitMode="enter"
    >
      <Editable.Preview />
      <Editable.Textarea />
    </Editable.Root>
  )
}
