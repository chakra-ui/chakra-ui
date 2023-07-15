import { createContext } from "@chakra-ui/react-context"
import { SystemStyleObject } from "@chakra-ui/system"
import { UseAccordionItemReturn } from "./use-accordion"

export const [AccordionStylesProvider, useAccordionStyles] = createContext<
  Record<string, SystemStyleObject>
>({
  name: "AccordionStylesContext",
  hookName: "useAccordionStyles",
  providerName: "<Accordion />",
})

type AccordionItemContext = Omit<UseAccordionItemReturn, "htmlProps">

export const [AccordionItemProvider, useAccordionItemContext] =
  createContext<AccordionItemContext>({
    name: "AccordionItemContext",
    hookName: "useAccordionItemContext",
    providerName: "<AccordionItem />",
  })
