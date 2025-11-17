import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight"
import Color from "@tiptap/extension-color"
import Highlight from "@tiptap/extension-highlight"
import Placeholder from "@tiptap/extension-placeholder"
import TaskItem from "@tiptap/extension-task-item"
import TaskList from "@tiptap/extension-task-list"
import TextAlign from "@tiptap/extension-text-align"
import { TextStyle } from "@tiptap/extension-text-style"
import { StarterKit } from "@tiptap/starter-kit"
import { common, createLowlight } from "lowlight"
import { LinkExtension } from "./link"

/**
 * Lowlight instance for code block syntax highlighting
 */
const lowlight = createLowlight(common)

/**
 * Pre-configured extensions for RichTextEditor
 * Includes all essential formatting, alignment, code, and list features
 */
export const DEFAULT_EXTENSIONS = [
  StarterKit.configure({
    codeBlock: false, // Use CodeBlockLowlight instead
  }),

  // Link extension with Chakra defaults
  LinkExtension,

  // Text styling
  TextStyle,
  Color.configure({
    types: ["textStyle"],
  }),

  // Code with syntax highlighting
  CodeBlockLowlight.configure({
    lowlight,
  }),

  // Text alignment
  TextAlign.configure({
    types: ["heading", "paragraph"],
  }),

  // Text highlighting
  Highlight.configure({
    multicolor: true,
  }),

  // Placeholder
  Placeholder.configure({
    placeholder: "Start typing...",
  }),

  // Task lists
  TaskList,
  TaskItem.configure({
    nested: true,
  }),
]

export { LinkExtension }
