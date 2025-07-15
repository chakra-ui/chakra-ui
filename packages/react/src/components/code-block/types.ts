export interface CodeBlockHighlightMeta {
  highlightLines?: number[]
  showLineNumbers?: boolean
  wordWrap?: boolean
  removedLineNumbers?: number[]
  addedLineNumbers?: number[]
  focusedLineNumbers?: number[]
  colorScheme?: "light" | "dark" | (string & {})
}

export interface CodeBlockHighlighterProps {
  code: string
  language?: string
  meta?: CodeBlockHighlightMeta
}

export type CodeBlockHighlighter = (props: CodeBlockHighlighterProps) => {
  code: string
  highlighted: boolean
}

export interface CodeBlockAdapter {
  loadContext?: () => Promise<any>
  getHighlighter: (ctx: any) => CodeBlockHighlighter
}
