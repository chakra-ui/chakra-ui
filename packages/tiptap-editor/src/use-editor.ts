import Subscript from "@tiptap/extension-subscript"
import Superscript from "@tiptap/extension-superscript"
import TextAlign from "@tiptap/extension-text-align"
import {
  type UseEditorOptions,
  useEditor as useTiptapEditor,
} from "@tiptap/react"
import { StarterKit } from "@tiptap/starter-kit"

export interface UseEditorProps extends Omit<UseEditorOptions, "extensions"> {
  extensions?: UseEditorOptions["extensions"]
}

export function useEditor(props: UseEditorProps) {
  const { extensions, ...rest } = props

  return useTiptapEditor({
    extensions: extensions || [
      StarterKit.configure({
        link: {
          openOnClick: false,
        },
      }),
      Subscript,
      Superscript,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
    ...rest,
  })
}
