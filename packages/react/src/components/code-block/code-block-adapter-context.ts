import { createContext } from "../../create-context"
import { plainTextAdapter } from "./adapters"
import type { UseCodeHighlightReturn } from "./use-code-highlight"

export interface UseCodeBlockAdapterContext extends UseCodeHighlightReturn {}

export const [CodeBlockAdapterContextProvider, useCodeBlockAdapterContext] =
  createContext<UseCodeBlockAdapterContext>({
    strict: false,
    defaultValue: {
      highlight: plainTextAdapter.getHighlighter(null),
      loadContext: () => Promise.resolve(null),
      getHighlighter: plainTextAdapter.getHighlighter,
    },
  })
