import { createContext } from "@chakra-ui/utils"
import { SystemStyleObject } from "../../styled-system"

export const [BlockquoteStylesProvider, useBlockquoteStyles] = createContext<
  Record<string, SystemStyleObject>
>({
  name: "BlockQuoteStylesContext",
  hookName: "useBlockQuoteStyles",
  providerName: "<BlockQuote.Root />",
})
