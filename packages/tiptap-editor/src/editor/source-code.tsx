"use client"

import type { TextareaProps } from "@chakra-ui/react"
import { Box, Textarea } from "@chakra-ui/react"
import { useState } from "react"
import { useEditorContext } from "../context"

export interface SourceCodeProps
  extends Omit<TextareaProps, "value" | "onChange"> {
  /**
   * Whether the source code editor is editable
   * @default false
   */
  isEditable?: boolean

  /**
   * Callback when source code is updated
   */
  onUpdate?: (html: string) => void
}

/**
 * Source code viewer/editor component
 * Displays and allows editing of raw HTML content
 */
export function SourceCode(props: SourceCodeProps) {
  const { isEditable = false, onUpdate, ...rest } = props
  const { editor } = useEditorContext()
  const [content, setContent] = useState(() => editor?.getHTML() || "")

  if (!editor) return null

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const html = e.target.value
    setContent(html)
    if (isEditable && onUpdate) {
      onUpdate(html)
    }
  }

  const handleUpdateEditor = () => {
    if (isEditable) {
      editor.commands.setContent(content)
    }
  }

  return (
    <Box>
      <Textarea
        value={content}
        onChange={handleChange}
        onBlur={handleUpdateEditor}
        readOnly={!isEditable}
        fontFamily="mono"
        fontSize="sm"
        minH="200px"
        p="3"
        borderWidth="1px"
        borderColor="border"
        borderRadius="md"
        {...rest}
      />
    </Box>
  )
}
