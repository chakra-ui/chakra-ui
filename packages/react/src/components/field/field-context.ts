import { createContext } from "../../create-context"
import type { UseFieldStateReturn } from "./use-field-state"

export const [FieldContextProvider, useFieldContext] =
  createContext<UseFieldStateReturn>({
    strict: false,
    name: "FieldContext",
  })
