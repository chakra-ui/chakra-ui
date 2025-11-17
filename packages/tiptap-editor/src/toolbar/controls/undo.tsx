"use client"

import { MdUndo } from "react-icons/md"
import { useEditorContext } from "../../context"
import { useEditorState } from "../../hooks"
import { Control } from "../control"
import type { ControlProps } from "../control"

export function Undo(
  props: Omit<ControlProps, "onClick" | "isActive" | "icon">,
) {
  const { editor } = useEditorContext()
  const { canUndo } = useEditorState()
  const { label, ...rest } = props

  if (!editor) return null

  return (
    <Control
      icon={<MdUndo />}
      label={label}
      disabled={!canUndo}
      onClick={() => editor.chain().focus().undo().run()}
      {...rest}
    />
  )
}
