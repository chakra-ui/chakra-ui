import { createContext } from "@chakra-ui/react-utils"
import { CheckboxGroupContext } from "./checkbox-types"

export const [CheckboxGroupProvider, useCheckboxGroupContext] =
  createContext<CheckboxGroupContext>({
    name: "CheckboxGroupContext",
    strict: false,
  })
