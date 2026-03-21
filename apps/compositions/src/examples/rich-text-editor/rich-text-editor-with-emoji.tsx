"use client"

import Emoji, { emojis } from "@tiptap/extension-emoji"
import { useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import { RichTextEditor } from "compositions/ui/rich-text-editor"
import { createEmojiSuggestionConfig } from "compositions/ui/rich-text-editor-menu"

export const RichTextEditorWithEmoji = () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Emoji.configure({
        emojis,
        enableEmoticons: true,
        suggestion: createEmojiSuggestionConfig(emojis),
      }),
    ],
    content: `<p>Type <strong>:</strong> to insert an emoji, like :smile: or :heart:</p><p>You can also use emoticons like :) or &lt;3</p>`,
    shouldRerenderOnTransaction: true,
    immediatelyRender: false,
  })

  if (!editor) return null

  return (
    <RichTextEditor.Root editor={editor} rounded="md">
      <RichTextEditor.Content />
    </RichTextEditor.Root>
  )
}
