import { Editable, Input } from "@sh3yk0-ui/react"

export const EditableWithCustomComponent = () => {
  return (
    <Editable.Root defaultValue="Click to edit">
      <Editable.Preview>
        <Input />
      </Editable.Preview>
    </Editable.Root>
  )
}
