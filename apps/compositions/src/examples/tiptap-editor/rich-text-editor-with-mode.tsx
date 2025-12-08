"use client"

import { Box, HStack } from "@chakra-ui/react"
import { useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import {
  RichTextEditorButtonGroup,
  RichTextEditorContent,
  RichTextEditorRoot,
  createButtonControl,
  createSelectControl,
} from "compositions/ui/rich-text-editor"
import { useState } from "react"
import { LuBold } from "react-icons/lu"

export const RichTextEditorWithMode = () => {
  const [mode, setMode] = useState("edit")

  const editor = useEditor({
    extensions: [StarterKit],
    content: `<p>Edit this text...</p>`,
    editable: mode === "edit",
    shouldRerenderOnTransaction: true,
  })

  if (!editor) return null

  const handleModeChange = (newMode: string) => {
    setMode(newMode)
    editor.setEditable(newMode === "edit")
  }

  return (
    <RichTextEditorRoot
      editor={editor}
      border="1px solid"
      borderColor="border"
      rounded="md"
      isDisabled={mode !== "edit"}
    >
      <HStack
        p="2"
        borderBottom="1px solid"
        borderColor="border"
        justifyContent="space-between"
      >
        {mode === "edit" ? (
          <RichTextEditorButtonGroup>
            <Bold />
          </RichTextEditorButtonGroup>
        ) : (
          <Box />
        )}

        <RichTextEditorButtonGroup noSeparator>
          <ModePicker
            width="120px"
            currentMode={mode}
            onModeChange={handleModeChange}
          />
        </RichTextEditorButtonGroup>
      </HStack>

      <RichTextEditorContent />
    </RichTextEditorRoot>
  )
}

const Bold = createButtonControl({
  label: "Bold",
  icon: LuBold,
  command: (editor) => {
    editor.chain().focus().toggleBold().run()
  },
  getVariant: (editor) => (editor.isActive("bold") ? "subtle" : "ghost"),
  isDisabled: (editor) => !editor.isEditable,
})

interface ModePickerProps {
  currentMode: string
  onModeChange: (mode: string) => void
  width?: string
}

const ModePicker = ({
  currentMode,
  onModeChange,
  ...props
}: ModePickerProps) => {
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

  return <SelectControl {...props} />
}
