import { createContext } from "../../create-context"
import type { SystemStyleObject } from "../../styled-system"
import type { UseCheckboxReturn } from "../checkbox"

export const [SwitchStylesProvider, useSwitchStyles] = createContext<
  Record<string, SystemStyleObject>
>({
  name: `SwitchStylesContext`,
  errorMessage: `useSwitchStyles returned is 'undefined'. Seems you forgot to wrap the components in "<Switch />" `,
})

interface SwitchContext extends UseCheckboxReturn {}

export const [SwitchContextProvider, useSwitchContext] =
  createContext<SwitchContext>({
    name: `SwitchContext`,
    errorMessage: `useSwitchContext: 'context' is undefined`,
  })
