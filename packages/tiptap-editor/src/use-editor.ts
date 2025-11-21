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
    extensions: extensions || [StarterKit],
    ...rest,
  })
}
