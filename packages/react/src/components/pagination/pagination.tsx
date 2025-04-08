"use client"

import type { Assign } from "@ark-ui/react"
import {
  Pagination as ArkPagination,
  usePaginationContext,
} from "@ark-ui/react/pagination"
import { forwardRef, useMemo } from "react"
import {
  type HTMLChakraProps,
  type SlotRecipeProps,
  type UnstyledProp,
  createSlotRecipeContext,
} from "../../styled-system"
import { Box, type BoxProps } from "../box"
import { IconButton } from "../button"
import { For } from "../for"
import { EllipsisIcon } from "../icons"

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

////////////////////////////////////////////////////////////////////////////////////

export interface PaginationPageTextProps extends BoxProps {
  format?: "short" | "compact" | "long"
}

export const PaginationPageText = forwardRef<
  HTMLParagraphElement,
  PaginationPageTextProps
>(function PaginationPageText(props, ref) {
  const { format = "compact", ...rest } = props
  const { page, totalPages, pageRange, count } = usePaginationContext()
  const content = useMemo(() => {
    if (format === "short") return `${page} / ${totalPages}`
    if (format === "compact") return `${page} of ${totalPages}`
    return `${pageRange.start + 1} - ${Math.min(pageRange.end, count)} of ${count}`
  }, [format, page, totalPages, pageRange, count])

  return (
    <Box fontWeight="medium" ref={ref} {...rest}>
      {content}
    </Box>
  )
})

////////////////////////////////////////////////////////////////////////////////////

export interface PaginationItemsProps
  extends React.HTMLAttributes<HTMLElement> {
  render: (page: { type: "page"; value: number }) => React.ReactNode
  ellipsis?: React.ReactElement
}

export const PaginationItems = (props: PaginationItemsProps) => {
  const { pages } = usePaginationContext()
  const { render, ellipsis, ...rest } = props
  return (
    <For each={pages}>
      {(page, index) => {
        if (page.type === "ellipsis") {
          return (
            <PaginationEllipsis asChild key={index} index={index} {...rest}>
              {ellipsis || (
                <IconButton as="span">
                  <EllipsisIcon />
                </IconButton>
              )}
            </PaginationEllipsis>
          )
        }

        return (
          <PaginationItem
            asChild
            key={index}
            type="page"
            value={page.value}
            {...rest}
          >
            {render(page)}
          </PaginationItem>
        )
      }}
    </For>
  )
}
