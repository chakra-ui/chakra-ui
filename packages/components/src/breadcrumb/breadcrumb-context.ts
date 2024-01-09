import { SystemStyleObject } from "@chakra-ui/styled-system"
import { createContext } from "@chakra-ui/utils/context"

export const [BreadcrumbStylesProvider, useBreadcrumbStyles] = createContext<
  Record<string, SystemStyleObject>
>({
  name: `BreadcrumbStylesContext`,
  errorMessage: `useBreadcrumbStyles returned is 'undefined'. Seems you forgot to wrap the components in "<Breadcrumb />" `,
})
