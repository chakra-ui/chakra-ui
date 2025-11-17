"use client"

import { MdPowerInput } from "react-icons/md"
import { useEditorContext } from "../../context"
import { Control } from "../control"
import type { ControlProps } from "../control"

export function Superscript(
  props: Omit<ControlProps, "onClick" | "isActive" | "icon">,
) {
  const { editor } = useEditorContext()
  const { label, ...rest } = props

  if (!editor) return null

  return (
    <Control
      icon={<MdPowerInput />}
      label={label}
      isActive={editor.isActive("superscript")}
      // onClick={() => editor.chain().focus().setSuperscript().run()}
      {...rest}
    />
  )
}
