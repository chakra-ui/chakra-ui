import type { Meta } from "@storybook/react-vite"
import { Box } from "../src"

export default {
  title: "Rich Text Editor / Editors",
  decorators: [
    (Story) => (
      <Box p="10">
        <Story />
      </Box>
    ),
  ],
} satisfies Meta

export { RichTextEditorBasic as Basic } from "compositions/examples/tiptap-editor/rich-text-editor-basic"
export { RichTextEditorControlled as Controlled } from "compositions/examples/tiptap-editor/rich-text-editor-controlled"
export { RichTextEditorPlaceholder as Placeholder } from "compositions/examples/tiptap-editor/rich-text-editor-placeholder"
