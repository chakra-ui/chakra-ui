"use client"

import { Splitter } from "@chakra-ui/react"
import Subscript from "@tiptap/extension-subscript"
import Superscript from "@tiptap/extension-superscript"
import TextAlign from "@tiptap/extension-text-align"
import { useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import { Prose } from "compositions/ui/prose"
import { RichTextEditor } from "compositions/ui/rich-text-editor"
import * as Control from "compositions/ui/rich-text-editor-control"

export const RichTextEditorWithPreview = () => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({ link: { openOnClick: false } }),
      Subscript,
      Superscript,
      TextAlign.configure({ types: ["paragraph", "heading"] }),
    ],
    content: `
        <p>Edit here...</p>
        <p><strong>Tip:</strong> Try selecting this sentence.</p>
        <h2>Example Subheading</h2>
        <p>Here's a paragraph with <em>italic</em>, <u>underline</u>, and <strong>bold</strong> text.</p>
        <p><code>Code snippets can be inline or block-level.</code></p>
        <ul>
        <li>Item one</li>
        <li>Item two</li>
        <li>Item three</li>
        </ul>
        <ol>
        <li>First numbered item</li>
        <li>Second numbered item</li>
        </ol>
        <blockquote>This is a blockquote example.</blockquote>
    `,
    shouldRerenderOnTransaction: true,
  })

  if (!editor) return null

  return (
    <Splitter.Root panels={[{ id: "editor" }, { id: "preview" }]} minH="60">
      <Splitter.Panel id="editor">
        <RichTextEditor.Root
          editor={editor}
          css={{ "--content-min-height": "520px" }}
        >
          <RichTextEditor.Toolbar>
            <RichTextEditor.ControlGroup>
              <Control.Bold />
              <Control.Italic />
              <Control.Underline />
              <Control.Strikethrough />
              <Control.Code />
            </RichTextEditor.ControlGroup>
            <RichTextEditor.ControlGroup>
              <Control.H1 />
              <Control.H2 />
              <Control.H3 />
              <Control.H4 />
            </RichTextEditor.ControlGroup>
            <RichTextEditor.ControlGroup>
              <Control.Undo />
              <Control.Redo />
            </RichTextEditor.ControlGroup>
          </RichTextEditor.Toolbar>

          <RichTextEditor.Content />
        </RichTextEditor.Root>
      </Splitter.Panel>

      <Splitter.ResizeTrigger id="editor:preview" />
      <Splitter.Panel id="preview" px="8" py="2">
        <Prose
          width="full"
          size="lg"
          color="fg"
          dangerouslySetInnerHTML={{ __html: editor.getHTML() }}
        />
      </Splitter.Panel>
    </Splitter.Root>
  )
}
