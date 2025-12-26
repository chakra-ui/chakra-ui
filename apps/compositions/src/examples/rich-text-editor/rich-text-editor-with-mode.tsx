"use client"

import { Box, HStack } from "@chakra-ui/react"
import { useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import {
  RichTextEditorContent,
  RichTextEditorControlGroup,
  RichTextEditorRoot,
  createBooleanControl,
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
      disabled={mode !== "edit"}
    >
      <HStack
        p="2"
        borderBottom="1px solid"
        borderColor="border"
        justifyContent="space-between"
      >
        {mode === "edit" ? (
          <RichTextEditorControlGroup>
            <Bold />
          </RichTextEditorControlGroup>
        ) : (
          <Box />
        )}

        <RichTextEditorControlGroup noSeparator>
          <ModePicker
            width="120px"
            currentMode={mode}
            onModeChange={handleModeChange}
          />
        </RichTextEditorControlGroup>
      </HStack>

      <RichTextEditorContent />
    </RichTextEditorRoot>
  )
}

const Bold = createBooleanControl({
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
