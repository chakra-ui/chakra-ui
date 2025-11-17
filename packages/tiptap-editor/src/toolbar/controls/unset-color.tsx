"use client"

import { MdDeleteOutline } from "react-icons/md"
import { useEditorContext } from "../../context"
import { Control } from "../control"
import type { ControlProps } from "../control"

export function UnsetColor(
  props: Omit<ControlProps, "onClick" | "isActive" | "icon">,
) {
  const { editor } = useEditorContext()
  const { label, ...rest } = props

  if (!editor) return null

  return (
    <Control
      icon={<MdDeleteOutline />}
      label={label}
      onClick={() => editor.chain().focus().clearNodes().run()}
      {...rest}
    />
  )
}
