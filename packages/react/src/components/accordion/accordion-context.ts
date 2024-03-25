import { createContext } from "../../create-context"
import { SystemStyleObject } from "../../styled-system"
import { UseAccordionReturn } from "./use-accordion"
import { UseAccordionItemReturn } from "./use-accordion-item"

export const [AccordionStylesProvider, useAccordionStyles] = createContext<
  Record<string, SystemStyleObject>
>({
  name: "AccordionStylesContext",
  hookName: "useAccordionStyles",
  providerName: "<Accordion.Root />",
})

interface AccordionContext extends UseAccordionReturn {
  reduceMotion: boolean
}

export const [AccordionContextProvider, useAccordionContext] =
  createContext<AccordionContext>({
    name: "AccordionContext",
    hookName: "useAccordionContext",
    providerName: "<Accordion.Root />",
  })

interface AccordionItemContext extends UseAccordionItemReturn {}

export const [AccordionItemContextProvider, useAccordionItemContext] =
  createContext<AccordionItemContext>({
    name: "AccordionItemContext",
    hookName: "useAccordionItemContext",
    providerName: "<Accordion.Item />",
  })
