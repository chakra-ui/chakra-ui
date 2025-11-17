"use client"

import { MdLink } from "react-icons/md"
import { useEditorContext } from "../../context"
import { Control } from "../control"
import type { ControlProps } from "../control"

export function Link(
  props: Omit<ControlProps, "onClick" | "isActive" | "icon">,
) {
  const { editor } = useEditorContext()
  const { label, ...rest } = props

  if (!editor) return null

  return (
    <Control
      icon={<MdLink />}
      label={label}
      isActive={editor.isActive("link")}
      onClick={() => {
        const url = prompt("Enter URL:")
        if (url) {
          editor.chain().focus().setLink({ href: url }).run()
        }
      }}
      {...rest}
    />
  )
}
