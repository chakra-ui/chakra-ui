"use client"

import { Editable, Input, Stack } from "@chakra-ui/react"
import { useRef } from "react"

export const EditableWithFinalFocus = () => {
  const ref = useRef<HTMLInputElement>(null)

  return (
    <Stack>
      <Input placeholder="Placeholder" ref={ref} />
      <Editable.Root
        finalFocusEl={() => ref.current}
        defaultValue="Final fantasy"
        fontSize="xl"
      >
        <Editable.Preview />
        <Editable.Input />
        <Editable.Control>
          <Editable.EditTrigger>Edit</Editable.EditTrigger>
          <Editable.CancelTrigger>Cancel</Editable.CancelTrigger>
          <Editable.SubmitTrigger>Submit</Editable.SubmitTrigger>
        </Editable.Control>
      </Editable.Root>
    </Stack>
  )
}
