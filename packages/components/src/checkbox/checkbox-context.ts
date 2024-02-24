import { createContext } from "@chakra-ui/utils/context"
import { CheckboxContext, CheckboxGroupContext } from "./checkbox-types"
import { SystemStyleObject } from ".."

export const [CheckboxGroupProvider, useCheckboxGroupContext] =
  createContext<CheckboxGroupContext>({
    name: "CheckboxGroupContext",
    strict: false,
  })

export const [CheckboxContextProvider, useCheckboxContext] =
  createContext<CheckboxContext>({
    name: "CheckboxContext",
    strict: false,
  })

export const [CheckboxStylesProvider, useCheckboxStyles] = createContext<
  Record<string, SystemStyleObject>
>({
  name: "CheckboxStylesContext",
  hookName: "useCheckboxStyles",
  providerName: "<CheckboxRoot />",
})
