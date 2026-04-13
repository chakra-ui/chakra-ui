"use client"

import { Accordion as ArkAccordion } from "@ark-ui/react/accordion"
import type { ComponentProps } from "react"
import { chakra, createSlotRecipeContext } from "../../../styled-system/jsx"
import { accordion } from "../../../styled-system/recipes"

const { withProvider, withContext } = createSlotRecipeContext(accordion)

export type RootProps = ComponentProps<typeof Root>
export const Root = withProvider(ArkAccordion.Root, "root")

export type RootProviderProps = ComponentProps<typeof RootProvider>
export const RootProvider = withProvider(ArkAccordion.RootProvider, "root")

export type ItemProps = ComponentProps<typeof Item>
export const Item = withContext(ArkAccordion.Item, "item")

export type ItemContentProps = ComponentProps<typeof ItemContent>
export const ItemContent = withContext(ArkAccordion.ItemContent, "itemContent")

export type ItemIndicatorProps = ComponentProps<typeof ItemIndicator>
export const ItemIndicator = withContext(
  ArkAccordion.ItemIndicator,
  "itemIndicator",
)

export type ItemTriggerProps = ComponentProps<typeof ItemTrigger>
export const ItemTrigger = withContext(ArkAccordion.ItemTrigger, "itemTrigger")

export type ItemBodyProps = ComponentProps<typeof ItemBody>
export const ItemBody = withContext(chakra.div, "itemBody")

export { AccordionContext as Context } from "@ark-ui/react/accordion"
