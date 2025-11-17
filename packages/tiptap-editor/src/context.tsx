"use client"

import type { Editor } from "@tiptap/react"
import { type ReactNode, createContext, useContext } from "react"
import { DEFAULT_LABELS } from "./constants/labels"
import type { RichTextEditorLabels } from "./types"

////////////////////////////////////////////////////////////////////////////////////

export interface EditorContextValue {
  editor: Editor | null
  labels: RichTextEditorLabels
}

const EditorContext = createContext<EditorContextValue | undefined>(undefined)

////////////////////////////////////////////////////////////////////////////////////

export interface EditorProviderProps {
  children: ReactNode
  editor: Editor | null
  labels?: Partial<RichTextEditorLabels>
}

export function EditorProvider(props: EditorProviderProps) {
  const { children, editor, labels: labelsProp } = props
  const labels = { ...DEFAULT_LABELS, ...labelsProp }

  return (
    <EditorContext.Provider value={{ editor, labels }}>
      {children}
    </EditorContext.Provider>
  )
}

////////////////////////////////////////////////////////////////////////////////////

export function useEditorContext() {
  const context = useContext(EditorContext)

  if (!context) {
    throw new Error(
      "useEditorContext must be used within an EditorProvider. Wrap your component with <EditorProvider>.",
    )
  }

  return context
}
