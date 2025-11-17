"use client"

import { MdRedo } from "react-icons/md"
import { useEditorContext } from "../../context"
import { useEditorState } from "../../hooks"
import { Control } from "../control"
import type { ControlProps } from "../control"

export function Redo(
  props: Omit<ControlProps, "onClick" | "isActive" | "icon">,
) {
  const { editor } = useEditorContext()
  const { canRedo } = useEditorState()
  const { label, ...rest } = props

  if (!editor) return null

  return (
    <Control
      icon={<MdRedo />}
      label={label}
      disabled={!canRedo}
      onClick={() => editor.chain().focus().redo().run()}
      {...rest}
    />
  )
}
