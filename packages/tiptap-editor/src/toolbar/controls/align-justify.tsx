"use client"

import { MdFormatAlignJustify } from "react-icons/md"
import { useEditorContext } from "../../context"
import { Control } from "../control"
import type { ControlProps } from "../control"

export function AlignJustify(
  props: Omit<ControlProps, "onClick" | "isActive" | "icon">,
) {
  const { editor } = useEditorContext()
  const { label, ...rest } = props

  if (!editor) return null

  return (
    <Control
      icon={<MdFormatAlignJustify />}
      label={label}
      isActive={editor.isActive({ textAlign: "justify" })}
      onClick={() => editor.chain().focus().setTextAlign("justify").run()}
      {...rest}
    />
  )
}
