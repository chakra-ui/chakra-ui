import { RichTextEditor } from "@chakra-ui/tiptap-editor"
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight"
import { useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import css from "highlight.js/lib/languages/css"
import js from "highlight.js/lib/languages/javascript"
import ts from "highlight.js/lib/languages/typescript"
import html from "highlight.js/lib/languages/xml"
import { all, createLowlight } from "lowlight"

const lowlight = createLowlight(all)

lowlight.register("html", html)
lowlight.register("css", css)
lowlight.register("js", js)
lowlight.register("ts", ts)

export function RichTextEditorWithCode() {
  const editor = useEditor({
    content: `<p>
    That’s a boring paragraph followed by a fenced code block:
  </p>
  <pre><code class="language-javascript">${code}</code></pre>
  <p>
    Press Command/Ctrl + Enter to leave the fenced code block and continue typing in boring paragraphs.
  </p>`,
    shouldRerenderOnTransaction: true,
    extensions: [StarterKit, CodeBlockLowlight.configure({ lowlight })],
  })

  if (!editor) return null

  return (
    <RichTextEditor.Root editor={editor}>
      <RichTextEditor.Toolbar>
        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Bold />
          <RichTextEditor.Italic />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.CodeBlock />
        </RichTextEditor.ControlsGroup>
      </RichTextEditor.Toolbar>

      <RichTextEditor.Content />
    </RichTextEditor.Root>
  )
}

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
