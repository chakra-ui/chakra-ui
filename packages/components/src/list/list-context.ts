import { SystemStyleObject } from "@chakra-ui/styled-system"
import { createContext } from "@chakra-ui/utils/context"

export const [ListStylesProvider, useListStyles] = createContext<
  Record<string, SystemStyleObject>
>({
  name: `ListStylesContext`,
  errorMessage: `useListStyles returned is 'undefined'. Seems you forgot to wrap the components in "<List />" `,
})
