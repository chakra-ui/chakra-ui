import { createContext } from "@chakra-ui/utils"
import { SystemStyleObject } from "../../styled-system"
import { UseTabsReturn } from "./use-tabs"

export const [TabsProvider, useTabsContext] = createContext<UseTabsReturn>({
  name: "TabsContext",
  errorMessage:
    "useTabsContext: `context` is undefined. Seems you forgot to wrap all tabs components within <Tabs />",
})

export interface TabPanelContext {
  isSelected: boolean
  id: string
  tabId: string
  selectedValue: string
}

export const [TabContentProvider, useTabContentContext] =
  createContext<TabPanelContext>({})

export const [TabsStylesProvider, useTabsStyles] = createContext<
  Record<string, SystemStyleObject>
>({
  name: `TabsStylesContext`,
  errorMessage: `useTabsStyles returned is 'undefined'. Seems you forgot to wrap the components in "<Tabs />" `,
})
