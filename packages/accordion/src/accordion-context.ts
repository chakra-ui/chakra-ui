import { createDescendantContext } from "@chakra-ui/descendant"
import { createContext } from "@chakra-ui/react-utils"
import { SystemStyleObject } from "@chakra-ui/system"
import { Dict } from "@chakra-ui/utils"
import { UseAccordionItemReturn } from "./use-accordion"

export const [AccordionStylesProvider, useAccordionStyles] = createContext<
  Dict<SystemStyleObject>
>({
  name: `AccordionStylesContext`,
  errorMessage: `useAccordionStyles returned is 'undefined'. Seems you forgot to wrap the components in "<Accordion />" `,
})

type AccordionItemContext = Omit<UseAccordionItemReturn, "htmlProps">

export const [AccordionItemProvider, useAccordionItemContext] =
  createContext<AccordionItemContext>({
    name: "AccordionItemContext",
    errorMessage:
      "useAccordionItemContext: `context` is undefined. Seems you forgot to wrap the accordion item parts in `<AccordionItem />` ",
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
