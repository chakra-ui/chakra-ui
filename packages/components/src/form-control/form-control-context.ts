import { SystemStyleObject } from "@chakra-ui/styled-system"
import { createContext } from "@chakra-ui/utils"
import { FormControlProviderContext } from "./types"

export const [FormControlStylesProvider, useFormControlStyles] = createContext<
  Record<string, SystemStyleObject>
>({
  name: `FormControlStylesContext`,
  errorMessage: `useFormControlStyles returned is 'undefined'. Seems you forgot to wrap the components in "<FormControl />" `,
})

export const [FormControlProvider, useFormControlContext] =
  createContext<FormControlProviderContext>({
    strict: false,
    name: "FormControlContext",
  })

export const [FormErrorStylesProvider, useFormErrorStyles] = createContext<
  Record<string, SystemStyleObject>
>({
  name: `FormErrorStylesContext`,
  errorMessage: `useFormErrorStyles returned is 'undefined'. Seems you forgot to wrap the components in "<FormError />" `,
})
