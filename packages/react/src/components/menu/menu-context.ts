import { UseAnimationStateReturn } from "@chakra-ui/hooks"
import { createContext } from "@chakra-ui/utils"
import { SystemStyleObject } from "../../styled-system"
import { UseMenuReturn } from "./use-menu"
import { UseOptionGroupStateReturn } from "./use-option-group-state"

export const [MenuProvider, useMenuContext] = createContext<UseMenuReturn>({
  strict: true,
  name: "MenuContext",
})

export const [MenuGroupContextProvider, useMenuGroupContext] =
  createContext<UseOptionGroupStateReturn>({
    name: "MenuGroupContext",
  })

export const [MenuStylesProvider, useMenuStyles] = createContext<
  Record<string, SystemStyleObject>
>({
  name: `MenuStylesContext`,
  errorMessage: `useMenuStyles returned is 'undefined'. Seems you forgot to wrap the components in "<Menu />" `,
})

export const [AnimationStateProvider, useAnimationStateContext] =
  createContext<UseAnimationStateReturn>({
    name: "AnimationStateContext",
  })
