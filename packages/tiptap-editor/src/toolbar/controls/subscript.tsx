"use client"

import { MdSubscript } from "react-icons/md"
import { useEditorContext } from "../../context"
import { Control } from "../control"
import type { ControlProps } from "../control"

export function Subscript(
  props: Omit<ControlProps, "onClick" | "isActive" | "icon">,
) {
  const { editor } = useEditorContext()
  const { label, ...rest } = props

  if (!editor) return null

  return (
    <Control
      icon={<MdSubscript />}
      label={label}
      isActive={editor.isActive("subscript")}
      // onClick={() =>editor.commands.()}
      {...rest}
    />
  )
}
