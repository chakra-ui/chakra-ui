"use client"

import { HStack } from "@chakra-ui/react"
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight"
import { useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import {
  RichTextEditorButtonGroup,
  RichTextEditorContent,
  RichTextEditorRoot,
  createButtonControl,
} from "compositions/ui/rich-text-editor"
import css from "highlight.js/lib/languages/css"
import js from "highlight.js/lib/languages/javascript"
import ts from "highlight.js/lib/languages/typescript"
import html from "highlight.js/lib/languages/xml"
import { all, createLowlight } from "lowlight"
import { LuBold, LuCode, LuItalic } from "react-icons/lu"

const lowlight = createLowlight(all)
lowlight.register("html", html)
lowlight.register("css", css)
lowlight.register("js", js)
lowlight.register("ts", ts)

export function RichTextEditorWithCode() {
  const editor = useEditor({
    extensions: [StarterKit, CodeBlockLowlight.configure({ lowlight })],
    content: `<p>That’s a boring paragraph followed by a fenced code block:</p>
<pre><code class="language-javascript">${code}</code></pre>
<p>Press Command/Ctrl + Enter to leave the fenced code block and continue typing in boring paragraphs.</p>`,
  })

  if (!editor) return null

  return (
    <RichTextEditorRoot
      editor={editor}
      border="1px solid"
      borderColor="border"
      rounded="md"
    >
      <HStack gap="2" p="2" borderBottom="1px solid" borderColor="border">
        <RichTextEditorButtonGroup>
          <BoldButton />
          <ItalicButton />
          <CodeBlockButton />
        </RichTextEditorButtonGroup>
      </HStack>
      <RichTextEditorContent />
    </RichTextEditorRoot>
  )
}

// Escape HTML so it can be safely injected
function escapeHtml(unsafe: string) {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
}

const code = escapeHtml(`
async function fetchTodos() {
  const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=5')
  const data = await response.json()
  return data
}

async function showTodos() {
  const todos = await fetchTodos()
  todos.forEach(todo => console.log(\`\${todo.id}: \${todo.title} [\${todo.completed ? '✅' : '❌'}]\`))
}

showTodos()
`)

const BoldButton = createButtonControl({
  label: "Bold",
  icon: LuBold,
  command: (editor) => editor.chain().focus().toggleBold().run(),
})

const ItalicButton = createButtonControl({
  label: "Italic",
  icon: LuItalic,
  command: (editor) => editor.chain().focus().toggleItalic().run(),
})

const CodeBlockButton = createButtonControl({
  label: "Code Block",
  icon: LuCode,
  command: (editor) => editor.chain().focus().toggleCodeBlock().run(),
})
