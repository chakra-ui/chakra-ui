import { createContext } from "@chakra-ui/utils"
import { SystemStyleObject } from "../../styled-system"
import { UsePopoverReturn } from "./use-popover"

export const [PopoverProvider, usePopoverContext] =
  createContext<UsePopoverReturn>({
    name: "PopoverContext",
    errorMessage:
      "usePopoverContext: `context` is undefined. Seems you forgot to wrap all popover components within `<Popover />`",
  })

export const [PopoverStylesProvider, usePopoverStyles] = createContext<
  Record<string, SystemStyleObject>
>({
  name: `PopoverStylesContext`,
  errorMessage: `usePopoverStyles returned is 'undefined'. Seems you forgot to wrap the components in "<Popover />" `,
})
