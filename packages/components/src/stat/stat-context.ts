import { SystemStyleObject } from "@chakra-ui/styled-system"

import { createContext } from "@chakra-ui/utils/context"

export const [StatStylesProvider, useStatStyles] = createContext<
  Record<string, SystemStyleObject>
>({
  name: `StatStylesContext`,
  errorMessage: `useStatStyles returned is 'undefined'. Seems you forgot to wrap the components in "<Stat />" `,
})
