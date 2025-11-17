"use client"

import { MdTitle } from "react-icons/md"
import { useEditorContext } from "../../context"
import { Control } from "../control"
import type { ControlProps } from "../control"

export function H6(props: Omit<ControlProps, "onClick" | "isActive" | "icon">) {
  const { editor } = useEditorContext()
  const { label, ...rest } = props

  if (!editor) return null

  return (
    <Control
      icon={<MdTitle />}
      label={label}
      isActive={editor.isActive("heading", { level: 6 })}
      onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
      {...rest}
    />
  )
}
