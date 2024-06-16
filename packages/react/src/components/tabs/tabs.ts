"use client"

import { Tabs as ArkTabs } from "@ark-ui/react/tabs"
import {
  type HTMLChakraProps,
  type SlotRecipeProps,
  type UnstyledProp,
  createStyleContext,
} from "../../styled-system"

////////////////////////////////////////////////////////////////////////////////////

const {
  withProvider,
  withContext,
  useStyles: useTabsStyles,
} = createStyleContext("tabs")

export { useTabsStyles }

////////////////////////////////////////////////////////////////////////////////////

export interface TabsRootProps
  extends HTMLChakraProps<"div", ArkTabs.RootBaseProps>,
    SlotRecipeProps<"tabs">,
    UnstyledProp {}

export const TabsRoot = withProvider<HTMLDivElement, TabsRootProps>(
  ArkTabs.Root,
  "root",
  { forwardAsChild: true },
)

////////////////////////////////////////////////////////////////////////////////////

export interface TabsTriggerProps
  extends HTMLChakraProps<"button", ArkTabs.TriggerBaseProps> {}

export const TabsTrigger = withContext<HTMLButtonElement, TabsTriggerProps>(
  ArkTabs.Trigger,
  "trigger",
  { forwardAsChild: true },
)

////////////////////////////////////////////////////////////////////////////////////

export interface TabsContentProps
  extends HTMLChakraProps<"div", ArkTabs.ContentBaseProps> {}

export const TabsContent = withContext<HTMLDivElement, TabsContentProps>(
  ArkTabs.Content,
  "content",
  { forwardAsChild: true },
)

////////////////////////////////////////////////////////////////////////////////////

export interface TabsContentGroupProps extends HTMLChakraProps<"div"> {}

export const TabsContentGroup = withContext<
  HTMLDivElement,
  TabsContentGroupProps
>("div", "contentGroup")

////////////////////////////////////////////////////////////////////////////////////

export interface TabsListProps
  extends HTMLChakraProps<"div", ArkTabs.ListBaseProps> {}

export const TabsList = withContext<HTMLDivElement, TabsListProps>(
  ArkTabs.List,
  "list",
  { forwardAsChild: true },
)

////////////////////////////////////////////////////////////////////////////////////

export interface TabsIndicatorProps
  extends HTMLChakraProps<"div", ArkTabs.ListBaseProps> {}

export const TabsIndicator = withContext<HTMLDivElement, TabsIndicatorProps>(
  ArkTabs.Indicator,
  "indicator",
  { forwardAsChild: true },
)
