import { createContext } from "../../create-context"
import { type SystemStyleObject } from "../../styled-system"

export const [TableStylesProvider, useTableStyles] = createContext<
  Record<string, SystemStyleObject>
>({
  name: `TableStylesContext`,
  errorMessage: `useTableStyles returned is 'undefined'. Seems you forgot to wrap the components in "<Table />" `,
})
