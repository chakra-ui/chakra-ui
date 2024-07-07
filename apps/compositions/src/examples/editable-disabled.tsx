import { Editable, Label, VStack } from "@chakra-ui/react"

export const EditableDisabled = () => {
  return (
    <VStack alignItems="start">
      <Label>Disabled</Label>
      <Editable.Root disabled defaultValue="Click to edit" fontSize="xl">
        <Editable.Preview opacity={0.5} cursor="not-allowed" />
        <Editable.Input />
        <Editable.Control>
          <Editable.CancelTrigger>Cancel</Editable.CancelTrigger>
          <Editable.SubmitTrigger>Submit</Editable.SubmitTrigger>
        </Editable.Control>
      </Editable.Root>
    </VStack>
  )
}
