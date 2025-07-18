import { type UseClipboardReturn } from "@ark-ui/react/clipboard"
import { createContext } from "../../create-context"
import type { CodeBlockHighlighterProps } from "./types"

export interface CodeBlockCollapsible {
  contentId: string
  collapsed: boolean
  setCollapsed: (collapsed: boolean) => void
  toggleCollapsed: () => void
}

export interface UseCodeBlockContext extends CodeBlockHighlighterProps {
  collapsible: CodeBlockCollapsible
  clipboard: UseClipboardReturn
}

export const [CodeBlockContextProvider, useCodeBlockContext] =
  createContext<UseCodeBlockContext>({
    name: "CodeBlockContext",
    providerName: "CodeBlock.Root",
    hookName: "useCodeBlockContext",
  })
