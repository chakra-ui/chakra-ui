"use client"

import { createContext } from "../../create-context"
import type { SystemStyleObject } from "../../styled-system"
import type { UseRadioReturn } from "./use-radio"
import type { UseRadioGroupReturn } from "./use-radio-group"

export const [RadioGroupContextProvider, useRadioGroupContext] =
  createContext<UseRadioGroupReturn>({
    name: "RadioGroupContext",
    strict: false,
  })

export const [RadioItemContextProvider, useRadioItemContext] =
  createContext<UseRadioReturn>({
    name: "RadioItemContext",
    strict: false,
  })

export const [RadioGroupStylesProvider, useRadioGroupStyles] = createContext<
  Record<string, SystemStyleObject>
>({
  strict: false,
  defaultValue: {},
  name: "RadioGroupStylesContext",
  hookName: "useRadioGroupStyles",
  providerName: "<RadioGroup.Root />",
})
