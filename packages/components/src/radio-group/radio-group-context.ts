import { SystemStyleObject, ThemingProps } from "@chakra-ui/styled-system"
import { createContext } from "@chakra-ui/utils/context"
import { UseRadioReturn } from "./use-radio"
import { UseRadioGroupReturn } from "./use-radio-group"

export interface RadioGroupContext
  extends Pick<
      UseRadioGroupReturn,
      "onChange" | "value" | "name" | "isDisabled" | "isFocusable"
    >,
    Omit<ThemingProps<"Radio">, "orientation"> {}

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
  createContext<ThemingProps>({
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
