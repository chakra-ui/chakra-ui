"use client"

import type { UseAnimationStateReturn } from "@chakra-ui/hooks"
import { createContext } from "../../create-context"
import type { SystemStyleObject } from "../../styled-system"
import type { UseMenuReturn } from "./use-menu"
import type { UseOptionGroupStateReturn } from "./use-option-group-state"

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

export interface OptionItemContext {
  type: "radio" | "checkbox"
  checked?: boolean
}

export const [OptionItemStateProvider, useOptionItemStateContext] =
  createContext<OptionItemContext>({
    name: "OptionItemValueContext",
  })
