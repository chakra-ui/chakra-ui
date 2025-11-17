"use client"

import { MdFormatBold } from "react-icons/md"
import { useEditorContext } from "../../context"
import { Control } from "../control"
import type { ControlProps } from "../control"

export function Bold(
  props: Omit<ControlProps, "onClick" | "isActive" | "icon">,
) {
  const { editor } = useEditorContext()
  const { label, ...rest } = props

  if (!editor) return null

  return (
    <Control
      icon={<MdFormatBold />}
      label={label}
      isActive={editor.isActive("bold")}
      onClick={() => editor.chain().focus().toggleBold().run()}
      {...rest}
    />
  )
}
