import { createContext } from "@chakra-ui/utils"
import { SystemStyleObject } from "../../styled-system"
import { ProgressContext } from "./progress-types"

export const [ProgressStylesProvider, useProgressStyles] = createContext<
  Record<string, SystemStyleObject>
>({
  name: `ProgressStylesContext`,
  errorMessage: `useProgressStyles returned is 'undefined'. Seems you forgot to wrap the components in "<Progress />" `,
})

export const [ProgressContextProvider, useProgressContext] =
  createContext<ProgressContext>({
    name: `ProgressContext`,
    errorMessage: `useProgressContext: 'context' is undefined`,
  })
