"use client"

import { createContext } from "../../create-context"
import { SystemStyleObject } from "../../styled-system"

export const [CardStylesProvider, useCardStyles] = createContext<
  Record<string, SystemStyleObject>
>({
  name: `CardStylesContext`,
  errorMessage: `useCardStyles returned is 'undefined'. Seems you forgot to wrap the components in "<Card />" `,
})
