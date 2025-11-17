"use client"

import { MdLinkOff } from "react-icons/md"
import { useEditorContext } from "../../context"
import { Control } from "../control"
import type { ControlProps } from "../control"

export function Unlink(
  props: Omit<ControlProps, "onClick" | "isActive" | "icon">,
) {
  const { editor } = useEditorContext()
  const { label, ...rest } = props

  if (!editor) return null

  return (
    <Control
      icon={<MdLinkOff />}
      label={label}
      disabled={!editor.isActive("link")}
      onClick={() => editor.chain().focus().unsetLink().run()}
      {...rest}
    />
  )
}
