import { useMemo } from "react"
import { HighlightOptions, highlightWords } from "./highlight-words"

export interface UseHighlightProps extends HighlightOptions {}

export function useHighlight(props: UseHighlightProps) {
  const { text, query } = props
  return useMemo(() => highlightWords({ text, query }), [text, query])
}
