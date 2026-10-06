"use client"

import { createContext } from "../../create-context.ts"
import { plainTextAdapter } from "./adapters.ts"
import type { UseCodeHighlightReturn } from "./use-code-highlight.ts"

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
