"use client"

import type { Assign } from "@ark-ui/react"
import { useLocaleContext } from "@ark-ui/react/locale"
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
  extends
    Assign<ArkPagination.RootProviderBaseProps, SlotRecipeProps<"pagination">>,
    UnstyledProp {}

export interface PaginationRootProviderProps extends HTMLChakraProps<
  "div",
  PaginationRootProviderBaseProps
> {}

export const PaginationRootProvider = withProvider<
  HTMLDivElement,
  PaginationRootProviderProps
>(ArkPagination.RootProvider, "root", {
  forwardAsChild: true,
  forwardProps: ["page"],
})

////////////////////////////////////////////////////////////////////////////////////

export interface PaginationRootBaseProps
  extends
    Assign<ArkPagination.RootBaseProps, SlotRecipeProps<"pagination">>,
    UnstyledProp {}

export interface PaginationRootProps extends HTMLChakraProps<
  "div",
  PaginationRootBaseProps
> {}

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
  extends
    HTMLChakraProps<"div", ArkPagination.EllipsisBaseProps>,
    UnstyledProp {}

export const PaginationEllipsis = withContext<
  HTMLDivElement,
  PaginationEllipsisProps
>(ArkPagination.Ellipsis, "ellipsis", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface PaginationItemProps
  extends
    HTMLChakraProps<"button", ArkPagination.ItemBaseProps>,
    UnstyledProp {}

export const PaginationItem = withContext<
  HTMLButtonElement,
  PaginationItemProps
>(ArkPagination.Item, "item", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface PaginationNextTriggerProps
  extends
    HTMLChakraProps<"button", ArkPagination.NextTriggerBaseProps>,
    UnstyledProp {}

export const PaginationNextTrigger = withContext<
  HTMLButtonElement,
  PaginationNextTriggerProps
>(ArkPagination.NextTrigger, "nextTrigger", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface PaginationPrevTriggerProps
  extends
    HTMLChakraProps<"button", ArkPagination.PrevTriggerBaseProps>,
    UnstyledProp {}

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

export interface PaginationPageTextDetails {
  format: "short" | "compact" | "long"
  page: number
  totalPages: number
  pageRange: { start: number; end: number }
  count: number
  locale: string
  formattedPage: string
  formattedTotalPages: string
  formattedRangeStart: string
  formattedRangeEnd: string
  formattedCount: string
}

export interface PaginationPageTextProps extends BoxProps {
  format?: "short" | "compact" | "long" | undefined
  formatText?: ((details: PaginationPageTextDetails) => string) | undefined
}

export const PaginationPageText = forwardRef<
  HTMLParagraphElement,
  PaginationPageTextProps
>(function PaginationPageText(props, ref) {
  const { format = "compact", formatText, ...rest } = props
  const { page, totalPages, pageRange, count } = usePaginationContext()
  const { locale } = useLocaleContext()
  const content = useMemo(() => {
    const nf = new Intl.NumberFormat(locale)
    const details = {
      format,
      page,
      totalPages,
      pageRange,
      count,
      locale,
      formattedPage: nf.format(page),
      formattedTotalPages: nf.format(totalPages),
      formattedRangeStart: nf.format(pageRange.start + 1),
      formattedRangeEnd: nf.format(Math.min(pageRange.end, count)),
      formattedCount: nf.format(count),
    } satisfies PaginationPageTextDetails

    if (formatText) return formatText(details)
    if (format === "short") {
      return `${details.formattedPage} / ${details.formattedTotalPages}`
    }
    if (format === "compact") {
      return `${details.formattedPage} of ${details.formattedTotalPages}`
    }

    return `${details.formattedRangeStart} - ${details.formattedRangeEnd} of ${details.formattedCount}`
  }, [count, format, formatText, locale, page, pageRange, totalPages])

  return (
    <Box fontWeight="medium" ref={ref} {...rest}>
      {content}
    </Box>
  )
})

////////////////////////////////////////////////////////////////////////////////////

export interface PaginationItemsProps extends React.HTMLAttributes<HTMLElement> {
  render: (page: { type: "page"; value: number }) => React.ReactNode
  ellipsis?: React.ReactElement | undefined
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
