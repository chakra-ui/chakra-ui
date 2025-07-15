import type { Meta } from "@storybook/react-vite"
import { Box } from "../src"

export default {
  title: "Components / CodeBlock",
  decorators: [
    (Story) => (
      <Box p="10">
        <Story />
      </Box>
    ),
  ],
} satisfies Meta

export { CodeBlockShiki as Shiki } from "compositions/examples/code-block-shiki"
export { CodeBlockShikiWithCopy as ShikiWithCopy } from "compositions/examples/code-block-shiki-with-copy"
export { CodeBlockShikiWithLineFocusing as LineFocusing } from "compositions/examples/code-block-shiki-with-line-focusing"
export { CodeBlockShikiWithLineHighlighting as LineHighlighting } from "compositions/examples/code-block-shiki-with-line-highlighting"
export { CodeBlockShikiWithTitle as Title } from "compositions/examples/code-block-shiki-with-title"
export { CodeBlockShikiWithLineNumbers as LineNumbers } from "compositions/examples/code-block-shiki-with-line-numbers"
export { CodeBlockShikiWithDiff as Diff } from "compositions/examples/code-block-shiki-with-diff"
export { CodeBlockShikiWithMaxLines as MaxLines } from "compositions/examples/code-block-shiki-with-max-lines"
export { CodeBlockHighlightJs as HighlightJs } from "compositions/examples/code-block-highlight-js"
export { CodeBlockShikiWithWordWrap as WordWrap } from "compositions/examples/code-block-shiki-with-word-wrap"
export { CodeBlockShikiWithLanguageSwitcher as LanguageSwitcher } from "compositions/examples/code-block-shiki-with-language-switcher"
export { CodeBlockShikiWithThemes as Themes } from "compositions/examples/code-block-shiki-with-themes"
