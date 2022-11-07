import { createContext } from "@chakra-ui/react-context"
import { SystemStyleObject } from "@chakra-ui/system"

export const [CardStylesProvider, useCardStyles] = createContext<
  Record<string, SystemStyleObject>
>({
  name: "CardStylesContext",
  hookName: "useCardStyles",
  providerName: "<Card />",
})
