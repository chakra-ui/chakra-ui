import { useEffect, useMemo, useState } from "react"
import type { CodeBlockAdapter, CodeBlockHighlighter } from "./types"

export interface UseCodeHighlightProps extends CodeBlockAdapter {}

export interface UseCodeHighlightReturn extends CodeBlockAdapter {
  highlight: CodeBlockHighlighter | undefined
}

export function useCodeHighlight(props: UseCodeHighlightProps) {
  const { loadContext, getHighlighter } = props

  const [context, setContext] = useState<any>(null)
  const highlight = useMemo(
    () => getHighlighter(context),
    [getHighlighter, context],
  )

  useEffect(() => {
    loadContext?.().then(setContext)
  }, [loadContext])

  return {
    highlight,
    loadContext,
    getHighlighter,
  } as UseCodeHighlightReturn
}
