"use client"

import type { Assign } from "@ark-ui/react"
import { Pagination as ArkPagination } from "@ark-ui/react/pagination"
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
  useStyles: usePaginationStyles,
  PropsProvider,
} = createSlotRecipeContext({ key: "pagination" })

export { usePaginationStyles }

////////////////////////////////////////////////////////////////////////////////////

export interface PaginationRootProviderBaseProps
  extends Assign<
      ArkPagination.RootProviderBaseProps,
      SlotRecipeProps<"pagination">
    >,
    UnstyledProp {}

export interface PaginationRootProviderProps
  extends HTMLChakraProps<"div", PaginationRootProviderBaseProps> {}

export const PaginationRootProvider = withProvider<
  HTMLDivElement,
  PaginationRootProviderProps
>(ArkPagination.RootProvider, "root", {
  forwardAsChild: true,
  forwardProps: ["page"],
})

////////////////////////////////////////////////////////////////////////////////////

export interface PaginationRootBaseProps
  extends Assign<ArkPagination.RootBaseProps, SlotRecipeProps<"pagination">>,
    UnstyledProp {}

export interface PaginationRootProps
  extends HTMLChakraProps<"div", PaginationRootBaseProps> {}

export const PaginationRoot = withProvider<HTMLDivElement, PaginationRootProps>(
  ArkPagination.Root,
  "root",
  { forwardAsChild: true, forwardProps: ["page"] },
)

////////////////////////////////////////////////////////////////////////////////////

export const PaginationPropsProvider =
  PropsProvider as React.Provider<PaginationRootBaseProps>

////////////////////////////////////////////////////////////////////////////////////

export interface PaginationEllipsisProps
  extends HTMLChakraProps<"div", ArkPagination.EllipsisBaseProps> {}

export const PaginationEllipsis = withContext<
  HTMLDivElement,
  PaginationEllipsisProps
>(ArkPagination.Ellipsis, "ellipsis", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface PaginationItemProps
  extends HTMLChakraProps<"button", ArkPagination.ItemBaseProps> {}

export const PaginationItem = withContext<
  HTMLButtonElement,
  PaginationItemProps
>(ArkPagination.Item, "item", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface PaginationNextTriggerProps
  extends HTMLChakraProps<"button", ArkPagination.NextTriggerBaseProps> {}

export const PaginationNextTrigger = withContext<
  HTMLButtonElement,
  PaginationNextTriggerProps
>(ArkPagination.NextTrigger, "nextTrigger", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface PaginationPrevTriggerProps
  extends HTMLChakraProps<"button", ArkPagination.PrevTriggerBaseProps> {}

export const PaginationPrevTrigger = withContext<
  HTMLButtonElement,
  PaginationPrevTriggerProps
>(ArkPagination.PrevTrigger, "prevTrigger", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export const PaginationContext = ArkPagination.Context

export interface PaginationPageChangeDetails
  extends ArkPagination.PageChangeDetails {}

export interface PaginationPageSizeChangeDetails
  extends ArkPagination.PageSizeChangeDetails {}
