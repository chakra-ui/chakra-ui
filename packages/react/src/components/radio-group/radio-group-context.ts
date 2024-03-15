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

export const [RadioItemStylesProvider, useRadioItemStyles] = createContext<
  Record<string, SystemStyleObject>
>({
  name: "RadioItemStylesContext",
  hookName: "useRadioItemStyles",
  providerName: "<RadioGroup.Item />",
})
