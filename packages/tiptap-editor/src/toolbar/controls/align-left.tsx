"use client"

import { MdFormatAlignLeft } from "react-icons/md"
import { useEditorContext } from "../../context"
import { Control } from "../control"
import type { ControlProps } from "../control"

export function AlignLeft(
  props: Omit<ControlProps, "onClick" | "isActive" | "icon">,
) {
  const { editor } = useEditorContext()
  const { label, ...rest } = props

  if (!editor) return null

  return (
    <Control
      icon={<MdFormatAlignLeft />}
      label={label}
      isActive={editor.isActive({ textAlign: "left" })}
      onClick={() => editor.chain().focus().setTextAlign("left").run()}
      {...rest}
    />
  )
}
