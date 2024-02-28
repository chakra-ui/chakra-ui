import { SystemStyleObject } from "@chakra-ui/styled-system"
import { createContext } from "@chakra-ui/utils/context"

export const [TagStylesProvider, useTagStyles] = createContext<
  Record<string, SystemStyleObject>
>({
  name: `TagStylesContext`,
  errorMessage: `useTagStyles returned is 'undefined'. Seems you forgot to wrap the components in "<Tag.Root />" `,
})
