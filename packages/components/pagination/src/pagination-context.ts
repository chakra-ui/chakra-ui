import { createContext } from "@chakra-ui/react-context"
import { UsePaginationReturn } from "./use-pagination"
import { SystemStyleObject } from "@chakra-ui/system"

export const [PaginationProvider, usePaginationContext] =
  createContext<UsePaginationReturn>({
    name: "PaginationContext",
    errorMessage:
      "usePaginationContext: `context` is undefined. Seems you forgot to wrap pagination's components within <Pagination />",
  })

export const [PaginationStylesProvider, usePaginationStyles] = createContext<
  Record<string, SystemStyleObject>
>({
  name: `PaginationStylesContext`,
  errorMessage: `usePaginationStyles returned is 'undefined'. Seems you forgot to wrap the components in "<Pagination />" `,
})
