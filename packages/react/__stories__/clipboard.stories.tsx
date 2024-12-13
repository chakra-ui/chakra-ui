import type { Meta } from "@storybook/react"
import { Box } from "../src"

export default {
  title: "Components / Clipboard",
  decorators: [
    (Story) => (
      <Box p="10">
        <Story />
      </Box>
    ),
  ],
} satisfies Meta

export { ClipboardBasic as Basic } from "compositions/examples/clipboard-basic"
export { ClipboardWithButton as Button } from "compositions/examples/clipboard-with-button"
export { ClipboardWithTimeout as Timeout } from "compositions/examples/clipboard-with-timeout"
export { ClipboardWithInput as Input } from "compositions/examples/clipboard-with-input"
export { ClipboardWithLink as Link } from "compositions/examples/clipboard-with-link"
export { ClipboardWithoutSnippet as WithoutSnippet } from "compositions/examples/clipboard-without-snippet"
