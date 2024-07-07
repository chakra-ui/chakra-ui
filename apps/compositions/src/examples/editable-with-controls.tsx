import { Editable, HStack } from "@chakra-ui/react"

export const EditableWithControls = () => {
  return (
    <Editable.Root defaultValue="Click to edit" fontSize="xl">
      <Editable.Preview />
      <Editable.Input />
      <Editable.Control>
        <Editable.EditTrigger>Edit</Editable.EditTrigger>
        <HStack>
          <Editable.CancelTrigger>Cancel</Editable.CancelTrigger>
          <Editable.SubmitTrigger>Submit</Editable.SubmitTrigger>
        </HStack>
      </Editable.Control>
    </Editable.Root>
  )
}
