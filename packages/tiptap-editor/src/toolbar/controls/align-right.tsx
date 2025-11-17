"use client"

import { MdFormatAlignRight } from "react-icons/md"
import { useEditorContext } from "../../context"
import { Control } from "../control"
import type { ControlProps } from "../control"

export function AlignRight(
  props: Omit<ControlProps, "onClick" | "isActive" | "icon">,
) {
  const { editor } = useEditorContext()
  const { label, ...rest } = props

  if (!editor) return null

  return (
    <Control
      icon={<MdFormatAlignRight />}
      label={label}
      isActive={editor.isActive({ textAlign: "right" })}
      onClick={() => editor.chain().focus().setTextAlign("right").run()}
      {...rest}
    />
  )
}
