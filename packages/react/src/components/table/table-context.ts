import { createContext } from "@chakra-ui/utils"
import { SystemStyleObject } from "../../styled-system"

export const [TableStylesProvider, useTableStyles] = createContext<
  Record<string, SystemStyleObject>
>({
  name: `TableStylesContext`,
  errorMessage: `useTableStyles returned is 'undefined'. Seems you forgot to wrap the components in "<Table />" `,
})
