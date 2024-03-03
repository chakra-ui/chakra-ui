import { createContext } from "@chakra-ui/utils"
import { SystemStyleObject } from "../../styled-system"
import { FieldProviderContext } from "./types"

export const [FieldStylesProvider, useFieldStyles] = createContext<
  Record<string, SystemStyleObject>
>({
  name: `FieldStylesContext`,
  errorMessage: `useFieldStyles returned is 'undefined'. Seems you forgot to wrap the components in "<Field />" `,
})

export const [FieldContextProvider, useFieldContext] =
  createContext<FieldProviderContext>({
    strict: false,
    name: "FieldContext",
  })

export const [FieldErrorStylesProvider, useFieldErrorStyles] = createContext<
  Record<string, SystemStyleObject>
>({
  name: `FieldErrorStylesContext`,
  errorMessage: `useFieldErrorStyles returned is 'undefined'. Seems you forgot to wrap the components in "<FieldError />" `,
})
