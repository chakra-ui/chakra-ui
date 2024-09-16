"use client"

import type { Assign } from "@ark-ui/react"
import { Collapsible as ArkCollapsible } from "@ark-ui/react/collapsible"
import {
  type HTMLChakraProps,
  type SlotRecipeProps,
  type UnstyledProp,
  createSlotRecipeContext,
} from "../../styled-system"

////////////////////////////////////////////////////////////////////////////////////

const {
  withProvider,
  withContext,
  useStyles: useCollapsibleStyles,
  PropsProvider,
} = createSlotRecipeContext({ key: "collapsible" })

export { useCollapsibleStyles }

////////////////////////////////////////////////////////////////////////////////////

export interface CollapsibleRootProviderBaseProps
  extends Assign<
      ArkCollapsible.RootProviderBaseProps,
      SlotRecipeProps<"collapsible">
    >,
    UnstyledProp {}

export interface CollapsibleRootProviderProps
  extends HTMLChakraProps<"div", CollapsibleRootProviderBaseProps> {}

export const CollapsibleRootProvider = withProvider<
  HTMLDivElement,
  CollapsibleRootProviderProps
>(ArkCollapsible.RootProvider, "root", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface CollapsibleRootBaseProps
  extends Assign<ArkCollapsible.RootBaseProps, SlotRecipeProps<"collapsible">>,
    UnstyledProp {}

export interface CollapsibleRootProps
  extends HTMLChakraProps<"div", CollapsibleRootBaseProps> {}

export const CollapsibleRoot = withProvider<
  HTMLDivElement,
  CollapsibleRootProps
>(ArkCollapsible.Root, "root", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export const CollapsiblePropsProvider =
  PropsProvider as React.Provider<CollapsibleRootBaseProps>

////////////////////////////////////////////////////////////////////////////////////

export interface CollapsibleTriggerProps
  extends HTMLChakraProps<"button", ArkCollapsible.TriggerBaseProps> {}

export const CollapsibleTrigger = withContext<
  HTMLButtonElement,
  CollapsibleTriggerProps
>(ArkCollapsible.Trigger, "trigger", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface CollapsibleContentProps
  extends HTMLChakraProps<"div", ArkCollapsible.ContentBaseProps> {}

export const CollapsibleContent = withContext<
  HTMLDivElement,
  CollapsibleContentProps
>(ArkCollapsible.Content, "content", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export const CollapsibleContext = ArkCollapsible.Context

export interface CollapsibleOpenChangeDetails
  extends ArkCollapsible.OpenChangeDetails {}
