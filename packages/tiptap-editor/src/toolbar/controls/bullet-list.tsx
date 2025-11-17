"use client"

import { MdFormatListBulleted } from "react-icons/md"
import { useEditorContext } from "../../context"
import { Control } from "../control"
import type { ControlProps } from "../control"

export function BulletList(
  props: Omit<ControlProps, "onClick" | "isActive" | "icon">,
) {
  const { editor } = useEditorContext()
  const { label, ...rest } = props

  if (!editor) return null

  return (
    <Control
      icon={<MdFormatListBulleted />}
      label={label}
      isActive={editor.isActive("bulletList")}
      onClick={() => editor.chain().focus().toggleBulletList().run()}
      {...rest}
    />
  )
}
