"use client"

import { CodeBlockAdapterContextProvider } from "./code-block-adapter-context"
import {
  type UseCodeHighlightProps,
  useCodeHighlight,
} from "./use-code-highlight"

export interface CodeBlockAdapterProviderProps {
  children: React.ReactNode
  value: UseCodeHighlightProps
}

export function CodeBlockAdapterProvider(props: CodeBlockAdapterProviderProps) {
  const { children, value } = props
  const context = useCodeHighlight(value)
  return (
    <CodeBlockAdapterContextProvider value={context}>
      {children}
    </CodeBlockAdapterContextProvider>
  )
}
