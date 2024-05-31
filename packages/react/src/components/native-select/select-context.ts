"use client"

import { createContext } from "../../create-context"
import { type SystemStyleObject } from "../../styled-system"
import { type UseFieldPropsReturn } from "../field/use-field-props"

export const [SelectStylesProvider, useSelectStyles] = createContext<
  Record<string, SystemStyleObject>
>({
  name: `SelectStylesContext`,
  errorMessage: `useSelectStyles returned is 'undefined'. Seems you forgot to wrap the components in "<NativeSelect />" `,
})

export const [SelectContextProvider, useSelectContext] =
  createContext<UseFieldPropsReturn>({
    name: `SelectContextContext`,
    errorMessage: `useSelectContext returned is 'undefined'. Seems you forgot to wrap the components in "<NativeSelect />" `,
  })
