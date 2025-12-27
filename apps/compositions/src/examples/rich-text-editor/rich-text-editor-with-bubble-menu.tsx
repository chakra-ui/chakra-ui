"use client"

import { HStack, StackSeparator } from "@chakra-ui/react"
import { useEditor } from "@tiptap/react"
import { BubbleMenu } from "@tiptap/react/menus"
import StarterKit from "@tiptap/starter-kit"
import { RichTextEditor } from "compositions/ui/rich-text-editor"
import * as Control from "compositions/ui/rich-text-editor-control"

export const RichTextEditorWithBubbleMenu = () => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: sampleContent,
    shouldRerenderOnTransaction: true,
  })

  if (!editor) return null

  return (
    <RichTextEditor.Root editor={editor} borderWidth="1px" rounded="lg">
      {editor && (
        <BubbleMenu editor={editor}>
          <HStack
            shadow="md"
            rounded="l2"
            bg="bg.panel"
            p="2"
            gap="1"
            separator={<StackSeparator />}
          >
            <RichTextEditor.ControlGroup>
              <Control.TextStyle />
            </RichTextEditor.ControlGroup>
            <RichTextEditor.ControlGroup>
              <Control.Bold />
              <Control.Italic />
              <Control.Underline />
              <Control.Strikethrough />
            </RichTextEditor.ControlGroup>
            <RichTextEditor.ControlGroup>
              <Control.BulletList />
              <Control.OrderedList />
            </RichTextEditor.ControlGroup>
          </HStack>
        </BubbleMenu>
      )}
      <RichTextEditor.Content />
    </RichTextEditor.Root>
  )
}

const sampleContent = `
  <h2>Select some text in this paragraph to see the bubble menu!</h2>
  <p>The <strong>Bold</strong>, <em>Italic</em>, <u>Underline</u>, and <strike>Strikethrough</strike> controls will appear. You can also change the block type here.</p>
  <p>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
  </p>
  <ul>
    <li>Try selecting text within this list item.</li>
    <li>Use the list buttons to switch between bullet and ordered lists.</li>
  </ul>
`
