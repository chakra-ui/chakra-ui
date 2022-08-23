import { createDescendantContext } from "@chakra-ui/descendant"
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

/* -------------------------------------------------------------------------------------------------
 * Create context to track descendants and their indices
 * -----------------------------------------------------------------------------------------------*/

export const [
  AccordionDescendantsProvider,
  useAccordionDescendantsContext,
  useAccordionDescendants,
  useAccordionDescendant,
] = createDescendantContext<HTMLButtonElement>()
