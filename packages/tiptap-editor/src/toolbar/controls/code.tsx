"use client"

import { MdCode } from "react-icons/md"
import { useEditorContext } from "../../context"
import { Control } from "../control"
import type { ControlProps } from "../control"

export function Code(
  props: Omit<ControlProps, "onClick" | "isActive" | "icon">,
) {
  const { editor } = useEditorContext()
  const { label, ...rest } = props

  if (!editor) return null

  return (
    <Control
      icon={<MdCode />}
      label={label}
      isActive={editor.isActive("code")}
      onClick={() => editor.chain().focus().toggleCode().run()}
      {...rest}
    />
  )
}
