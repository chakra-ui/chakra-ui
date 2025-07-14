import { createContext } from "../../create-context"
import { fallbackHighlighter } from "./fallback-highlighter"
import type { UseCodeHighlightReturn } from "./use-code-highlight"

export interface UseCodeBlockAdapterContext extends UseCodeHighlightReturn {}

export const [CodeBlockAdapterContextProvider, useCodeBlockAdapterContext] =
  createContext<UseCodeBlockAdapterContext>({
    strict: false,
    defaultValue: {
      highlight: fallbackHighlighter.getHighlighter(null),
      loadContext: () => Promise.resolve(null),
      getHighlighter: fallbackHighlighter.getHighlighter,
    },
  })
