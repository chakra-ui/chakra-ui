import { createContext } from "@chakra-ui/react-utils"
import { SystemStyleObject } from "@chakra-ui/system"
import { Dict } from "@chakra-ui/utils"

export const [BreadcrumbStylesProvider, useBreadcrumbStyles] = createContext<
  Dict<SystemStyleObject>
>({
  name: `BreadcrumbStylesContext`,
  errorMessage: `useBreadcrumbStyles returned is 'undefined'. Seems you forgot to wrap the components in "<Breadcrumb />" `,
})
