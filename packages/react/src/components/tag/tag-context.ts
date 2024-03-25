import { createContext } from "../../create-context"
import { SystemStyleObject } from "../../styled-system"

export const [TagStylesProvider, useTagStyles] = createContext<
  Record<string, SystemStyleObject>
>({
  name: `TagStylesContext`,
  errorMessage: `useTagStyles returned is 'undefined'. Seems you forgot to wrap the components in "<Tag.Root />" `,
})
