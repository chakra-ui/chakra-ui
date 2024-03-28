"use client"

import { createContext } from "../../create-context"
import { SystemStyleObject } from "../../styled-system"

export const [ListStylesProvider, useListStyles] = createContext<
  Record<string, SystemStyleObject>
>({
  name: `ListStylesContext`,
  errorMessage: `useListStyles returned is 'undefined'. Seems you forgot to wrap the components in "<List />" `,
})
