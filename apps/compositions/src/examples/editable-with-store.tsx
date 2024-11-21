"use client"

import { Code, Editable, Stack, useEditable } from "@chakra-ui/react"

export const EditableWithStore = () => {
  const editable = useEditable({
    defaultValue: "Click to edit",
  })

  return (
    <Stack align="flex-start">
      <Editable.RootProvider value={editable}>
        <Editable.Preview />
        <Editable.Input />
      </Editable.RootProvider>
      <Code>{editable.editing ? "editing" : "not editing"}</Code>
    </Stack>
  )
}
