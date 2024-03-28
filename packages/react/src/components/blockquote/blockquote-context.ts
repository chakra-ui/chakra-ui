"use client"

import { createContext } from "../../create-context"
import { SystemStyleObject } from "../../styled-system"

export const [BlockquoteStylesProvider, useBlockquoteStyles] = createContext<
  Record<string, SystemStyleObject>
>({
  name: "BlockQuoteStylesContext",
  hookName: "useBlockQuoteStyles",
  providerName: "<BlockQuote.Root />",
})
