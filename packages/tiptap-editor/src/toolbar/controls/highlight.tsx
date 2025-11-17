"use client"

import { MdHighlight } from "react-icons/md"
import { useEditorContext } from "../../context"
import { Control } from "../control"
import type { ControlProps } from "../control"

export function Highlight(
  props: Omit<ControlProps, "onClick" | "isActive" | "icon">,
) {
  const { editor } = useEditorContext()
  const { label, ...rest } = props

  if (!editor) return null

  return (
    <Control
      icon={<MdHighlight />}
      label={label}
      isActive={editor.isActive("highlight")}
      onClick={() => editor.chain().focus().toggleHighlight().run()}
      {...rest}
    />
  )
}
