"use client"

import { Box, Icon } from "@chakra-ui/react"
import { DragHandle } from "@tiptap/extension-drag-handle-react"
import { useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import {
  RichTextEditorContent,
  RichTextEditorControlGroup,
  RichTextEditorRoot,
  RichTextEditorToolbar,
} from "compositions/ui/rich-text-editor"
import * as Control from "compositions/ui/rich-text-editor-control"
import { LuGripVertical } from "react-icons/lu"

export const RichTextEditorWithDragHandle = () => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: `
      <p>Hover over any paragraph to see the drag handle appear on the left.</p>
      <p>This is another paragraph. You can drag blocks to reorder them.</p>
      <p>Try adding more content and rearranging it!</p>
      <ul>
        <li>List items can also be dragged</li>
        <li>Each block has its own handle</li>
      </ul>
      <blockquote>Blockquotes work too!</blockquote>
    `,
    shouldRerenderOnTransaction: true,
  })

  if (!editor) return null

  return (
    <RichTextEditorRoot editor={editor}>
      <RichTextEditorToolbar>
        <RichTextEditorControlGroup>
          <Control.Bold />
          <Control.Italic />
          <Control.Underline />
        </RichTextEditorControlGroup>

        <RichTextEditorControlGroup>
          <Control.BulletList />
          <Control.OrderedList />
          <Control.Blockquote />
        </RichTextEditorControlGroup>

        <RichTextEditorControlGroup>
          <Control.Undo />
          <Control.Redo />
        </RichTextEditorControlGroup>
      </RichTextEditorToolbar>

      <Box position="relative">
        <DragHandle editor={editor}>
          <Box
            pos="relative"
            top="-0.5"
            insetStart="-1"
            cursor="grab"
            color="fg.muted"
            opacity="0.6"
            _hover={{ opacity: 1, color: "fg" }}
            _active={{ cursor: "grabbing" }}
          >
            <Icon asChild boxSize="4">
              <LuGripVertical />
            </Icon>
          </Box>
        </DragHandle>
        <RichTextEditorContent />
      </Box>
    </RichTextEditorRoot>
  )
}
