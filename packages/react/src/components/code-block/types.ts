export type CodeBlockColorScheme = "light" | "dark" | (string & {})

export interface CodeBlockHighlightMeta {
  /**
   * The lines to highlight.
   */
  highlightLines?: number[] | undefined
  /**
   * Whether to show line numbers.
   */
  showLineNumbers?: boolean | undefined
  /**
   * Whether to wrap the code.
   */
  wordWrap?: boolean | undefined
  /**
   * The lines to remove.
   */
  removedLineNumbers?: number[] | undefined
  /**
   * The lines to add.
   */
  addedLineNumbers?: number[] | undefined
  /**
   * The lines to focus.
   */
  focusedLineNumbers?: number[] | undefined
  /**
   * The color scheme to use.
   */
  colorScheme?: CodeBlockColorScheme | undefined
}

export interface CodeBlockHighlighterProps {
  /**
   * The code to highlight.
   */
  code: string
  /**
   * The language of the code.
   */
  language?: string | undefined
  /**
   * The meta data for the code.
   */
  meta?: CodeBlockHighlightMeta | undefined
}

export type CodeBlockHighlighter = (props: CodeBlockHighlighterProps) => {
  code: string
  highlighted: boolean
}

export interface CodeBlockAdapter {
  /**
   * Load the context for the code block.
   */
  loadContext?: (() => Promise<any>) | undefined
  /**
   * Get the highlighter for the code block.
   */
  getHighlighter: (ctx: any) => CodeBlockHighlighter
}
