import type { Meta } from "@storybook/react-vite"
import { Box } from "../src"

export default {
  title: "Rich Text Editor / Tiptap",
  decorators: [
    (Story) => (
      <Box p="10">
        <Story />
      </Box>
    ),
  ],
} satisfies Meta

export { RichTextEditorBasic as Basic } from "compositions/examples/rich-text-editor/rich-text-editor-basic"
export { RichTextEditorControlled as Controlled } from "compositions/examples/rich-text-editor/rich-text-editor-controlled"
export { RichTextEditorWithBubbleMenu as BubbleMenu } from "compositions/examples/rich-text-editor/rich-text-editor-with-bubble-menu"
export { RichTextEditorWithTask as Task } from "compositions/examples/rich-text-editor/rich-text-editor-with-task"
export { RichTextEditorWithCharacterCount as CharacterCount } from "compositions/examples/rich-text-editor/rich-text-editor-with-character-count"
export { RichTextEditorWithImage as Image } from "compositions/examples/rich-text-editor/rich-text-editor-with-image"
export { RichTextEditorWithCode as Code } from "compositions/examples/rich-text-editor/rich-text-editor-with-code"
export { RichTextEditorWithHashtags as Hashtags } from "compositions/examples/rich-text-editor/rich-text-editor-with-hashtags"
export { RichTextEditorWithSlashCommands as SlashCommands } from "compositions/examples/rich-text-editor/rich-text-editor-with-slash-commands"
export { RichTextEditorWithMentions as Mentions } from "compositions/examples/rich-text-editor/rich-text-editor-with-mentions"
export { RichTextEditorWithMode as Mode } from "compositions/examples/rich-text-editor/rich-text-editor-with-mode"
export { RichTextEditorWithMarkdown as Markdown } from "compositions/examples/rich-text-editor/rich-text-editor-with-markdown"
export { RichTextEditorComposition as Composition } from "compositions/examples/rich-text-editor/rich-text-editor-composition"
