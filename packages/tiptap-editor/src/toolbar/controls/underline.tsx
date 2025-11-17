"use client"

import { MdFormatUnderlined } from "react-icons/md"
import { useEditorContext } from "../../context"
import { Control } from "../control"
import type { ControlProps } from "../control"

export function Underline(
  props: Omit<ControlProps, "onClick" | "isActive" | "icon">,
) {
  const { editor } = useEditorContext()
  const { label, ...rest } = props

  if (!editor) return null

  return (
    <Control
      icon={<MdFormatUnderlined />}
      label={label}
      isActive={editor.isActive("underline")}
      onClick={() => editor.chain().focus().toggleUnderline().run()}
      {...rest}
    />
  )
}
