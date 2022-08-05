import { createContext } from "@chakra-ui/react-utils"
import { SystemStyleObject } from "@chakra-ui/system"
import { Dict } from "@chakra-ui/utils"
import { UsePopoverReturn } from "./use-popover"

export const [PopoverProvider, usePopoverContext] =
  createContext<UsePopoverReturn>({
    name: "PopoverContext",
    errorMessage:
      "usePopoverContext: `context` is undefined. Seems you forgot to wrap all popover components within `<Popover />`",
  })

export const [PopoverStylesProvider, usePopoverStyles] = createContext<
  Dict<SystemStyleObject>
>({
  name: `PopoverStylesContext`,
  errorMessage: `usePopoverStyles returned is 'undefined'. Seems you forgot to wrap the components in "<Popover />" `,
})
