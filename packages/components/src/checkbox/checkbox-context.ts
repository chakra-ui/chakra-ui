import { createContext } from "../shared/context"
import { CheckboxGroupContext } from "./checkbox-types"

export const [CheckboxGroupProvider, useCheckboxGroupContext] =
  createContext<CheckboxGroupContext>({
    name: "CheckboxGroupContext",
    strict: false,
  })
