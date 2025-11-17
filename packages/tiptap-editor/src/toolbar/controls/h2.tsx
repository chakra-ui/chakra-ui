"use client"

import { MdTitle } from "react-icons/md"
import { useEditorContext } from "../../context"
import { Control } from "../control"
import type { ControlProps } from "../control"

export function H2(props: Omit<ControlProps, "onClick" | "isActive" | "icon">) {
  const { editor } = useEditorContext()
  const { label, ...rest } = props

  if (!editor) return null

  return (
    <Control
      icon={<MdTitle />}
      label={label}
      isActive={editor.isActive("heading", { level: 2 })}
      onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
      {...rest}
    />
  )
}
