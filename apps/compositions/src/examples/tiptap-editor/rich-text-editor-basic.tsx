import { RichTextEditor } from "@chakra-ui/tiptap-editor"
import Subscript from "@tiptap/extension-subscript"
import Superscript from "@tiptap/extension-superscript"
import TextAlign from "@tiptap/extension-text-align"
import { useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"

export function RichTextEditorBasic() {
  const editor = useEditor({
    content: `
    <h1>Welcome to Chakra UI + Tiptap!</h1>
    <p><strong>Chakra UI Tiptap</strong> is a rich text editor built with <em>React</em>, powered by <strong>Tiptap v3</strong> and styled with <a href="https://chakra-ui.com" target="_blank">Chakra UI</a>.</p>

    <h2>Why Tiptap?</h2>
    <p>Tiptap is a headless, framework-agnostic editor built on top of <a href="https://prosemirror.net" target="_blank">ProseMirror</a>. This means Chakra UI Tiptap gives you all the flexibility of Tiptap while keeping Chakra's styling and accessibility.</p>

    <h2>Features:</h2>
    <ul>
      <li>Bold, Italic, Underline, and Strike</li>
      <li>Headings, Blockquotes, and Horizontal Rules</li>
      <li>Lists: Bullet & Ordered</li>
      <li>Links, Subscript, Superscript, and Text Alignment</li>
      <li>Undo/Redo support and keyboard shortcuts</li>
      <li>Custom extensions and commands from Tiptap</li>
    </ul>

    <h2>Getting Started</h2>
    <p>Try editing this text to explore all the <strong>powerful commands</strong> available in the toolbar, which come straight from Tiptap's chainable API!</p>

    <blockquote>Tip: You can also create custom Tiptap extensions to add new commands and formatting options!</blockquote>
  `,
    shouldRerenderOnTransaction: true,
    extensions: [
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
  })

  return (
    <RichTextEditor.Root editor={editor}>
      <RichTextEditor.Toolbar>
        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Bold />
          <RichTextEditor.Italic />
          <RichTextEditor.Underline />
          <RichTextEditor.Strike />
          <RichTextEditor.Code />
          <RichTextEditor.ClearFormatting />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.H1 />
          <RichTextEditor.H2 />
          <RichTextEditor.H3 />
          <RichTextEditor.H4 />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Blockquote />
          <RichTextEditor.Hr />
          <RichTextEditor.BulletList />
          <RichTextEditor.OrderedList />
          <RichTextEditor.Subscript />
          <RichTextEditor.Superscript />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Link />
          <RichTextEditor.Unlink />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.AlignLeft />
          <RichTextEditor.AlignCenter />
          <RichTextEditor.AlignJustify />
          <RichTextEditor.AlignRight />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Undo />
          <RichTextEditor.Redo />
        </RichTextEditor.ControlsGroup>
      </RichTextEditor.Toolbar>

      <RichTextEditor.Content />
    </RichTextEditor.Root>
  )
}
