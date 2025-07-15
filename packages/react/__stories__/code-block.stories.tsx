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

export { CodeBlockBasic as Basic } from "compositions/examples/code-block-basic"
export { CodeBlockWithCopyButton as CopyButton } from "compositions/examples/code-block-with-copy-button"
export { CodeBlockWithCustomAction as CustomAction } from "compositions/examples/code-block-with-custom-action"
export { CodeBlockWithLineFocus as LineFocusing } from "compositions/examples/code-block-with-line-focus"
export { CodeBlockWithLineHighlight as LineHighlighting } from "compositions/examples/code-block-with-line-highlight"
export { CodeBlockWithTitle as Title } from "compositions/examples/code-block-with-title"
export { CodeBlockWithLineNumbers as LineNumbers } from "compositions/examples/code-block-with-line-numbers"
export { CodeBlockWithDiff as Diff } from "compositions/examples/code-block-with-diff"
export { CodeBlockWithMaxLines as MaxLines } from "compositions/examples/code-block-with-max-lines"
export { CodeBlockWithWordWrap as WordWrap } from "compositions/examples/code-block-with-word-wrap"
export { CodeBlockWithLanguageSwitcher as LanguageSwitcher } from "compositions/examples/code-block-with-language-switcher"
export { CodeBlockWithSizes as Sizes } from "compositions/examples/code-block-with-sizes"
export { CodeBlockWithFloatingAction as FloatingAction } from "compositions/examples/code-block-with-floating-action"
export { CodeBlockWithThemes as Themes } from "compositions/examples/code-block-with-themes"

export { CodeBlockWithHighlightJs as HighlightJs } from "compositions/examples/code-block-with-highlight-js"

export { CodeBlockWithTabs as Tabs } from "compositions/examples/code-block-with-tabs"
export { CodeBlockWithTabsSync as TabsSync } from "compositions/examples/code-block-with-tabs-sync"
