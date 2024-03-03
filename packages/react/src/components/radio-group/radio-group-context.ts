import { createContext } from "@chakra-ui/utils"
import { SystemRecipeProps, SystemStyleObject } from "../../styled-system"
import { UseRadioReturn } from "./use-radio"
import { UseRadioGroupReturn } from "./use-radio-group"

export interface RadioGroupContext
  extends Pick<
      UseRadioGroupReturn,
      "onChange" | "value" | "name" | "isDisabled" | "isFocusable"
    >,
    Omit<SystemRecipeProps<"Radio">, "orientation"> {}

export const [RadioGroupContextProvider, useRadioGroupContext] =
  createContext<RadioGroupContext>({
    name: "RadioGroupContext",
    strict: false,
  })

export const [RadioItemContextProvider, useRadioItemContext] =
  createContext<UseRadioReturn>({
    name: "RadioItemContext",
    strict: false,
  })

export const [RadioThemingContextProvider, useRadioThemingContext] =
  createContext<SystemRecipeProps<"Radio">>({
    name: "RadioGroupContext",
    strict: false,
  })

export const [RadioItemStylesProvider, useRadioItemStyles] = createContext<
  Record<string, SystemStyleObject>
>({
  name: "RadioItemStylesContext",
  hookName: "useRadioItemStyles",
  providerName: "<RadioGroup.Item />",
})
