"use client"

import { useMemo } from "react"
import { type HighlightOptions, highlightWords } from "./highlight-words"

export interface UseHighlightProps extends HighlightOptions {}

export function useHighlight(props: UseHighlightProps) {
  const { text, query } = props

  const sortedQuery = useMemo(() => {
    if (Array.isArray(query)) {
      return [...query].sort((a, b) => b.length - a.length)
    }
    return query
  }, [query])

  return useMemo(
    () => highlightWords({ text, query: sortedQuery }),
    [text, query],
  )
}
