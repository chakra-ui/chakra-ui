import type { CodeBlockAdapter } from "./types"

export const fallbackHighlighter: CodeBlockAdapter = {
  getHighlighter:
    () =>
    ({ code }) => ({ code, highlighted: false }),
}
