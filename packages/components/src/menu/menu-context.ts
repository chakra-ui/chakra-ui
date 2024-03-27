import { SystemStyleObject } from "@chakra-ui/styled-system"
import { createContext } from "@chakra-ui/utils/context"
import { UseMenuReturn } from "."

export const [MenuProvider, useMenuContext] = createContext<
  Omit<UseMenuReturn, "descendants">
>({
  strict: false,
  name: "MenuContext",
})

export const [MenuStylesProvider, useMenuStyles] = createContext<
  Record<string, SystemStyleObject>
>({
  name: `MenuStylesContext`,
  errorMessage: `useMenuStyles returned is 'undefined'. Seems you forgot to wrap the components in "<Menu />" `,
})
