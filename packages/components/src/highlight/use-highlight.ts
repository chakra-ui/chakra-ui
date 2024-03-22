import { useMemo } from "react"
import { HighlightOptions, highlightWords } from "./highlight-words"

export interface UseHighlightProps extends HighlightOptions {}

export function useHighlight(props: UseHighlightProps) {
  const { text, query, caseSensitive } = props
  return useMemo(
    () => highlightWords({ text, query, caseSensitive }),
    [text, query, caseSensitive],
  )
}
