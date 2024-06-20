"use client"

import { Pagination as ArkPagination } from "@ark-ui/react/pagination"
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
  useStyles: usePaginationStyles,
} = createStyleContext("pagination")

export { usePaginationStyles }

////////////////////////////////////////////////////////////////////////////////////

export interface PaginationRootProps
  extends HTMLChakraProps<"div", ArkPagination.RootBaseProps>,
    SlotRecipeProps<"pagination">,
    UnstyledProp {}

export const PaginationRoot = withProvider<HTMLDivElement, PaginationRootProps>(
  ArkPagination.Root,
  "root",
  { forwardAsChild: true },
)

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
