import { createContext } from "@chakra-ui/utils"
import { UseFieldReturn } from "../field/use-field"
import { SystemStyleObject } from "../styled-system"

export const [SelectStylesProvider, useSelectStyles] = createContext<
  Record<string, SystemStyleObject>
>({
  name: `SelectStylesContext`,
  errorMessage: `useSelectStyles returned is 'undefined'. Seems you forgot to wrap the components in "<NativeSelect />" `,
})

export const [SelectContextProvider, useSelectContext] =
  createContext<UseFieldReturn>({
    name: `SelectContextContext`,
    errorMessage: `useSelectContext returned is 'undefined'. Seems you forgot to wrap the components in "<NativeSelect />" `,
  })
