import { createContext } from "@chakra-ui/react-context"
import { SystemStyleObject } from "@chakra-ui/system"

export const [PaginationStylesProvider, usePaginationStyles] = createContext<
  Record<string, SystemStyleObject>
>({
  name: "PaginationStylesContext",
  hookName: "usePaginationStyles",
  providerName: "<Pagination />",
})
