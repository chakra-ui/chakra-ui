import { Editable } from "@sh3yk0-ui/react"

export const EditableDisabled = () => {
  return (
    <Editable.Root disabled defaultValue="Click to edit">
      <Editable.Preview opacity={0.5} cursor="not-allowed" />
      <Editable.Input />
    </Editable.Root>
  )
}
