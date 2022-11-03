import { createContext } from "@chakra-ui/react-context"
import { SystemStyleObject } from "@chakra-ui/system"

export const [AccordionStylesProvider, useAccordionStyles] = createContext<
  Record<string, SystemStyleObject>
>({
  name: "AccordionStylesContext",
  hookName: "useAccordionStyles",
  providerName: "<Accordion />",
})
