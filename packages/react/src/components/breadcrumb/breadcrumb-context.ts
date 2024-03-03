import { createContext } from "@chakra-ui/utils"
import { SystemStyleObject } from "../../styled-system"

export const [BreadcrumbStylesProvider, useBreadcrumbStyles] = createContext<
  Record<string, SystemStyleObject>
>({
  name: `BreadcrumbStylesContext`,
  errorMessage: `useBreadcrumbStyles returned is 'undefined'. Seems you forgot to wrap the components in "<Breadcrumb />" `,
})
