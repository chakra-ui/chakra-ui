"use client"

import { HStack } from "@chakra-ui/react"
import { useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import {
  Control,
  RichTextEditor,
  createSelectControl,
} from "compositions/ui/rich-text-editor"
import { useState } from "react"

export const RichTextEditorWithMode = () => {
  const [editable, setEditable] = useState(true)

  const editor = useEditor({
    extensions: [StarterKit],
    content: `<p>Edit this text...</p>`,
    editable,
    shouldRerenderOnTransaction: true,
    immediatelyRender: false,
  })

  if (!editor) return null

  const handleModeChange = (newMode: string) => {
    setEditable(newMode === "edit")
    editor.setEditable(newMode === "edit")
  }

  return (
    <RichTextEditor.Root editor={editor} borderWidth="1px" rounded="md">
      <HStack p="2" borderBottomWidth="1px" justify="space-between">
        <RichTextEditor.ControlGroup
          inert={!editable}
          opacity={!editable ? 0.5 : 1}
        >
          <Control.Bold />
          <Control.Italic />
          <Control.Underline />
          <Control.Strikethrough />
          <Control.Code />
        </RichTextEditor.ControlGroup>
        <RichTextEditor.ControlGroup>
          <ModePicker
            width="120px"
            currentMode={editable ? "edit" : "view"}
            onModeChange={handleModeChange}
          />
        </RichTextEditor.ControlGroup>
      </HStack>

      <RichTextEditor.Content />
    </RichTextEditor.Root>
  )
}

interface ModePickerProps {
  currentMode: string
  onModeChange: (mode: string) => void
  width?: string
}

const ModePicker = (props: ModePickerProps) => {
  const { currentMode, onModeChange, ...rest } = props

  const SelectControl = createSelectControl({
    label: "Mode",
    options: [
      { value: "edit", label: "Editing" },
      { value: "view", label: "Viewing" },
    ],
    getValue: () => currentMode,
    command: (_editor, value) => {
      onModeChange(value)
    },
  })

  return <SelectControl {...rest} />
}
