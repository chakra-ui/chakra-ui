"use client"

import { useEffect, useState } from "react"
import { useEditorContext } from "../context"

export interface EditorState {
  isEditable: boolean
  isEmpty: boolean
  isFocused: boolean
  canUndo: boolean
  canRedo: boolean
}

export function useEditorState(): EditorState {
  const { editor } = useEditorContext()
  const [state, setState] = useState<EditorState>({
    isEditable: false,
    isEmpty: true,
    isFocused: false,
    canUndo: false,
    canRedo: false,
  })

  useEffect(() => {
    if (!editor) return

    const updateState = () => {
      setState({
        isEditable: editor.isEditable,
        isEmpty: editor.isEmpty,
        isFocused: editor.isFocused,
        canUndo: editor.can().undo(),
        canRedo: editor.can().redo(),
      })
    }

    updateState()
    editor.on("update", updateState)
    editor.on("focus", updateState)
    editor.on("blur", updateState)
    editor.on("selectionUpdate", updateState)

    return () => {
      editor.off("update", updateState)
      editor.off("focus", updateState)
      editor.off("blur", updateState)
      editor.off("selectionUpdate", updateState)
    }
  }, [editor])

  return state
}
