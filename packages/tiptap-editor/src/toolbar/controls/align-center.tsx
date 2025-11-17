"use client"

import { MdFormatAlignCenter } from "react-icons/md"
import { useEditorContext } from "../../context"
import { Control } from "../control"
import type { ControlProps } from "../control"

export function AlignCenter(
  props: Omit<ControlProps, "onClick" | "isActive" | "icon">,
) {
  const { editor } = useEditorContext()
  const { label, ...rest } = props

  if (!editor) return null

  return (
    <Control
      icon={<MdFormatAlignCenter />}
      label={label}
      isActive={editor.isActive({ textAlign: "center" })}
      onClick={() => editor.chain().focus().setTextAlign("center").run()}
      {...rest}
    />
  )
}
