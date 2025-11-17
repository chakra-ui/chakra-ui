"use client"

import { MdRemove } from "react-icons/md"
import { useEditorContext } from "../../context"
import { Control } from "../control"
import type { ControlProps } from "../control"

export function Hr(props: Omit<ControlProps, "onClick" | "isActive" | "icon">) {
  const { editor } = useEditorContext()
  const { label, ...rest } = props

  if (!editor) return null

  return (
    <Control
      icon={<MdRemove />}
      label={label}
      onClick={() => editor.chain().focus().setHorizontalRule().run()}
      {...rest}
    />
  )
}
