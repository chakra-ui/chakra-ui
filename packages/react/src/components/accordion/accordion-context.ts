import { createContext } from "@chakra-ui/utils"
import { SystemStyleObject } from "../../styled-system"
import { UseAccordionItemReturn, UseAccordionReturn } from "./use-accordion"

export const [AccordionStylesProvider, useAccordionStyles] = createContext<
  Record<string, SystemStyleObject>
>({
  name: "AccordionStylesContext",
  hookName: "useAccordionStyles",
  providerName: "<Accordion.Root />",
})

interface AccordionContext
  extends Omit<UseAccordionReturn, "htmlProps" | "descendants"> {
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
