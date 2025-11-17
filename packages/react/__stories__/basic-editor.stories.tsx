import { Box } from "../src"

export default {
  title: "Rich Text Editor / Basic",
  decorators: [
    (Story: any) => (
      <Box p="10">
        <Story />
      </Box>
    ),
  ],
}

export { BasicEditor as Basic } from "compositions/examples/tiptap-editor/basic-editor"
