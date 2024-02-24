import { createContext } from "@chakra-ui/utils/context"
import { UseMenuReturn } from "."
import { createDescendantContext } from "../descendant"
import { SystemStyleObject } from "../styled-system"

export const [MenuProvider, useMenuContext] = createContext<
  Omit<UseMenuReturn, "descendants">
>({
  strict: false,
  name: "MenuContext",
})

export const [
  MenuDescendantsProvider,
  useMenuDescendantsContext,
  useMenuDescendants,
  useMenuDescendant,
] = createDescendantContext<HTMLElement>()

export const [MenuStylesProvider, useMenuStyles] = createContext<
  Record<string, SystemStyleObject>
>({
  name: `MenuStylesContext`,
  errorMessage: `useMenuStyles returned is 'undefined'. Seems you forgot to wrap the components in "<Menu />" `,
})
