import { createContext } from "@chakra-ui/utils"
import { createDescendantContext } from "../descendant"
import { SystemStyleObject } from "../styled-system"
import { UseTabsReturn } from "./use-tabs"

export const [
  TabsDescendantsProvider,
  useTabsDescendantsContext,
  useTabsDescendants,
  useTabsDescendant,
] = createDescendantContext<HTMLButtonElement>()

export const [TabsContextProvider, useTabsContext] =
  createContext<UseTabsReturn>({
    name: "TabsContext",
    errorMessage:
      "useTabsContext: `context` is undefined. Seems you forgot to wrap all tabs components within <Tabs />",
  })

export interface TabPanelContext {
  isSelected: boolean
  id: string
  tabId: string
  selectedIndex: number
}

export const [TabContentProvider, useTabContentContext] =
  createContext<TabPanelContext>({})

export const [TabsStylesProvider, useTabsStyles] = createContext<
  Record<string, SystemStyleObject>
>({
  name: `TabsStylesContext`,
  errorMessage: `useTabsStyles returned is 'undefined'. Seems you forgot to wrap the components in "<Tabs />" `,
})
