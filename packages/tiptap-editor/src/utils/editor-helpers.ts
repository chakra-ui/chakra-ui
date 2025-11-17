import type { Editor } from "@tiptap/react"

/**
 * Check if a command can be executed
 */
export function canExecuteCommand(editor: Editor, command: string): boolean {
  if (!editor) return false
  const [method, ...args] = command.split(".")
  try {
    const cmd = (editor.can() as any)[method]
    return typeof cmd === "function" ? cmd(...args)() : true
  } catch {
    return false
  }
}

/**
 * Get all active marks at current selection
 */
export function getActiveMarks(editor: Editor): string[] {
  if (!editor) return []
  const marks = editor.state.selection.$from.marks()
  return marks.map((mark) => mark.type.name)
}

/**
 * Get the active node at current selection
 */
export function getActiveNode(editor: Editor) {
  if (!editor) return null
  const { $from } = editor.state.selection
  return $from.parent
}

/**
 * Check if a specific mark is active
 */
export function isMarkActive(editor: Editor, mark: string): boolean {
  if (!editor) return false
  return editor.isActive(mark)
}

/**
 * Check if a specific node is active
 */
export function isNodeActive(
  editor: Editor,
  node: string,
  attrs?: Record<string, any>,
): boolean {
  if (!editor) return false
  return editor.isActive(node, attrs)
}

/**
 * Get current text alignment
 */
export function getTextAlign(editor: Editor): string {
  if (!editor) return "left"
  const { $from } = editor.state.selection
  const node = $from.parent
  return node.attrs.textAlign || "left"
}

/**
 * Get current text color
 */
export function getTextColor(editor: Editor): string | null {
  if (!editor) return null
  const mark = editor.state.selection.$from
    .marks()
    .find((m) => m.type.name === "textStyle")
  return mark?.attrs.color || null
}

/**
 * Get selected text
 */
export function getSelectedText(editor: Editor): string {
  if (!editor) return ""
  const { $from, $to } = editor.state.selection
  return editor.state.doc.textBetween($from.pos, $to.pos)
}

/**
 * Insert text at current cursor position
 */
export function insertText(editor: Editor, text: string): boolean {
  if (!editor) return false
  return editor.chain().focus().insertContent(text).run()
}

/**
 * Insert HTML at current cursor position
 */
export function insertHTML(editor: Editor, html: string): boolean {
  if (!editor) return false
  return editor.chain().focus().insertContent(html).run()
}
