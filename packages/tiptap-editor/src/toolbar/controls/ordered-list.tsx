"use client"

import { MdFormatListNumbered } from "react-icons/md"
import { useEditorContext } from "../../context"
import { Control } from "../control"
import type { ControlProps } from "../control"

export function OrderedList(
  props: Omit<ControlProps, "onClick" | "isActive" | "icon">,
) {
  const { editor } = useEditorContext()
  const { label, ...rest } = props

  if (!editor) return null

  return (
    <Control
      icon={<MdFormatListNumbered />}
      label={label}
      isActive={editor.isActive("orderedList")}
      onClick={() => editor.chain().focus().toggleOrderedList().run()}
      {...rest}
    />
  )
}
