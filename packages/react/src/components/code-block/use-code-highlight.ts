import { useEffect, useMemo, useRef, useState } from "react"
import type { CodeBlockAdapter, CodeBlockHighlighter } from "./types"

export interface UseCodeHighlightProps extends CodeBlockAdapter {}

export interface UseCodeHighlightReturn extends CodeBlockAdapter {
  highlight: CodeBlockHighlighter | undefined
}

export function useCodeHighlight(props: UseCodeHighlightProps) {
  const { loadContext, loadContextSync, getHighlighter, unloadContext } = props

  const [context, setContext] = useState<any>(() => loadContextSync?.() ?? null)
  const contextRef = useRef<any>(context)

  const highlight = useMemo(
    () => getHighlighter(context),
    [getHighlighter, context],
  )

  useEffect(() => {
    loadContext?.().then((c) => {
      contextRef.current = c
      setContext(c)
    })
    return () => {
      unloadContext?.(contextRef.current)
    }
  }, [loadContext, unloadContext])

  return {
    highlight,
    loadContext,
    getHighlighter,
  } as UseCodeHighlightReturn
}
