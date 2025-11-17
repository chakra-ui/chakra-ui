"use client"

import { MdFormatItalic } from "react-icons/md"
import { useEditorContext } from "../../context"
import { Control } from "../control"
import type { ControlProps } from "../control"

export function Italic(
  props: Omit<ControlProps, "onClick" | "isActive" | "icon">,
) {
  const { editor } = useEditorContext()
  const { label, ...rest } = props

  if (!editor) return null

  return (
    <Control
      icon={<MdFormatItalic />}
      label={label}
      isActive={editor.isActive("italic")}
      onClick={() => editor.chain().focus().toggleItalic().run()}
      {...rest}
    />
  )
}
