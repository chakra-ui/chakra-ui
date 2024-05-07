import { createContext } from "../../create-context"
import { type SystemStyleObject } from "../../styled-system"

export const [StatStylesProvider, useStatStyles] = createContext<
  Record<string, SystemStyleObject>
>({
  name: `StatStylesContext`,
  errorMessage: `useStatStyles returned is 'undefined'. Seems you forgot to wrap the components in "<Stat />" `,
})
