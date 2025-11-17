"use client"

import { MdPalette } from "react-icons/md"
import { useEditorContext } from "../../context"
import { Control } from "../control"
import type { ControlProps } from "../control"

export function Color(
  props: Omit<ControlProps, "onClick" | "isActive" | "icon">,
) {
  const { editor } = useEditorContext()
  const { label, ...rest } = props

  if (!editor) return null

  return (
    <Control
      icon={<MdPalette />}
      label={label}
      isActive={editor.isActive("textStyle", { color: /.+/ })}
      onClick={() => {
        // TODO: Fix color picker
        const color = prompt("Enter color (hex or named):")
        if (color) {
          editor.chain().focus().setColor(color).run()
        }
      }}
      {...rest}
    />
  )
}
