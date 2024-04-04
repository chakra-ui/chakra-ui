"use client"

import { createContext } from "../../create-context"
import { SystemStyleObject } from "../../styled-system"
import { UseRadioReturn } from "./use-radio"
import { UseRadioGroupReturn } from "./use-radio-group"

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
