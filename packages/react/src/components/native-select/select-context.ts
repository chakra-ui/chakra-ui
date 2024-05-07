"use client"

import { createContext } from "../../create-context"
import { type SystemStyleObject } from "../../styled-system"
import { type UseFieldReturn } from "../field/use-field"

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
