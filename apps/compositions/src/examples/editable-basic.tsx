import { Editable } from "@sh3yk0-ui/react"

export const EditableBasic = () => (
  <Editable.Root textAlign="start" defaultValue="Click to edit">
    <Editable.Preview />
    <Editable.Input />
  </Editable.Root>
)
