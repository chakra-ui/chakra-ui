import { createContext } from "@chakra-ui/utils"
import { SystemStyleObject } from "../../styled-system"
import { UseTooltipReturn } from "./use-tooltip"

export const [TooltipStylesProvider, useTooltipStyles] =
  createContext<SystemStyleObject>({
    name: `TooltipStylesContext`,
    errorMessage: `useTooltipStyles returned is 'undefined'. Seems you forgot to wrap the components in "<Tooltip.Root />" `,
  })

interface TooltipContext extends UseTooltipReturn {
  ariaLabel?: string
}

export const [TooltipContextProvider, useTooltipContext] =
  createContext<TooltipContext>({
    name: `TooltipContext`,
    errorMessage: `useTooltipContext: 'context' is undefined. Seems you forgot to wrap the components in "<Tooltip.Root />`,
  })
