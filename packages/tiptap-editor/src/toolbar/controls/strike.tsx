"use client"

import { MdStrikethroughS } from "react-icons/md"
import { useEditorContext } from "../../context"
import { Control } from "../control"
import type { ControlProps } from "../control"

export function Strike(
  props: Omit<ControlProps, "onClick" | "isActive" | "icon">,
) {
  const { editor } = useEditorContext()
  const { label, ...rest } = props

  if (!editor) return null

  return (
    <Control
      icon={<MdStrikethroughS />}
      label={label}
      isActive={editor.isActive("strike")}
      onClick={() => editor.chain().focus().toggleStrike().run()}
      {...rest}
    />
  )
}
