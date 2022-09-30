import {
  chakra,
  forwardRef,
  HTMLChakraProps,
  omitThemingProps,
  ThemingProps,
  useMultiStyleConfig,
} from "@chakra-ui/system"
import { cx } from "@chakra-ui/shared-utils"
import {
  PaginationProvider,
  PaginationStylesProvider,
  usePaginationContext,
  usePaginationStyles,
} from "./pagination-context"
import { usePagination, UsePaginationReturn } from "./use-pagination"
import { UsePaginationProps } from "./pagination-types"
import { useMemo } from "react"
import { pick } from "@chakra-ui/object-utils"

const exposedContext = [
  "page",
  "totalPages",
  "pages",
  "previousPage",
  "nextPage",
  "pageRange",
  "isFirstPage",
  "isLastPage",
  "setCount",
  "setPageSize",
  "setPage",
] as const

const getRenderProps = (ctx: UsePaginationReturn) => {
  return pick(ctx, exposedContext)
}

type ApiReturn = ReturnType<typeof usePaginationContext>
type ExposedContext = typeof exposedContext[number]
type PaginationChildren = { [K in ExposedContext]: ApiReturn[K] }

export interface PaginationProps
  extends UsePaginationProps,
    ThemingProps<"Pagination">,
    Omit<HTMLChakraProps<"div">, keyof UsePaginationProps | "children"> {
  children: (props: PaginationChildren) => React.ReactNode
}

/**
 * Pagination
 *
 * React component that provides context and logic to all
 * pagination sub-components.
 *
 * It renders a `nav` by default.
 *
 * @see Docs http://chakra-ui.com/pagination
 */
export const Pagination = forwardRef<PaginationProps, "nav">((props, ref) => {
  const styles = useMultiStyleConfig("Pagination", props)
  const {
    page,
    defaultPage,
    count,
    onChange,
    children,
    siblingCount,
    pageSize,
    defaultPageSize,
    ...rest
  } = omitThemingProps(props)

  const context = usePagination({
    page,
    defaultPage,
    count,
    onChange,
    siblingCount,
    pageSize,
    defaultPageSize,
  })
  const ctx = useMemo(() => context, [context])

  return (
    <PaginationProvider value={ctx}>
      <PaginationStylesProvider value={styles}>
        <chakra.nav
          {...ctx.rootProps}
          ref={ref}
          className={cx("chakra-pagination", props.className)}
          __css={styles.root}
          {...rest}
        >
          {children(getRenderProps(ctx))}
        </chakra.nav>
      </PaginationStylesProvider>
    </PaginationProvider>
  )
})

Pagination.displayName = "Pagination"

export interface PaginationListProps extends HTMLChakraProps<"ul"> {}

/**
 * PaginationList
 *
 * React component used to group the items in a pagination component
 *
 * It renders a `ul` by default.
 *
 * @see Docs http://chakra-ui.com/components/pagination
 */
export const PaginationList = forwardRef<PaginationListProps, "ul">(
  function PaginationList(props, ref) {
    const styles = usePaginationStyles()

    return (
      <chakra.ul
        ref={ref}
        {...props}
        className={cx("chakra-pagination__list", props.className)}
        __css={{
          ...styles.list,
        }}
      />
    )
  },
)

PaginationList.displayName = "PaginationList"

export interface PaginationPrevItemProps extends HTMLChakraProps<"a"> {
  rootProps?: HTMLChakraProps<"li">
}

/**
 * PaginationPrevItem
 *
 * React component used to navigate to previous page in pagination
 *
 * It renders `a` by default.
 *
 * @see Docs http://chakra-ui.com/components/pagination
 */
export const PaginationPrevItem = forwardRef<PaginationPrevItemProps, "a">(
  function PaginationPrevItem(props, ref) {
    const styles = usePaginationStyles()
    const api = usePaginationContext()
    const { rootProps, ...rest } = props

    return (
      <chakra.li {...rootProps}>
        <chakra.a
          aria-label="Previous Page"
          ref={ref}
          {...api.prevItemProps}
          {...rest}
          className={cx("chakra-pagination__prev-item", props.className)}
          __css={{
            ...styles.prevItem,
          }}
        />
      </chakra.li>
    )
  },
)

PaginationPrevItem.displayName = "PaginationPrevItem"

export interface PaginationNextItemProps extends HTMLChakraProps<"a"> {
  rootProps?: HTMLChakraProps<"li">
}

/**
 * PaginationNextItem
 *
 * React component used to navigate to next page in pagination
 *
 * It renders `a` by default.
 *
 * @see Docs http://chakra-ui.com/components/pagination
 */
export const PaginationNextItem = forwardRef<PaginationNextItemProps, "a">(
  function PaginationNextItem(props, ref) {
    const styles = usePaginationStyles()
    const api = usePaginationContext()
    const { rootProps, ...rest } = props

    return (
      <chakra.li {...rootProps}>
        <chakra.a
          aria-label="Next Page"
          ref={ref}
          {...api.nextItemProps}
          {...rest}
          className={cx("chakra-pagination__next-item", props.className)}
          __css={{
            ...styles.nextItem,
          }}
        />
      </chakra.li>
    )
  },
)

PaginationNextItem.displayName = "PaginationNextItem"

export interface PaginationEllipsisProps extends HTMLChakraProps<"a"> {
  rootProps?: HTMLChakraProps<"li">
  index: number
}

/**
 * PaginationEllipsis
 *
 * React component shown when there are hidden items in a pagination component
 *
 * It renders a `a` by default.
 *
 * @see Docs http://chakra-ui.com/components/pagination
 */
export const PaginationEllipsis = forwardRef<PaginationEllipsisProps, "ul">(
  function PaginationEllipsis(props, ref) {
    const styles = usePaginationStyles()
    const api = usePaginationContext()
    const { rootProps, children = "...", index, ...rest } = props

    return (
      <chakra.li {...rootProps}>
        <chakra.a
          ref={ref}
          {...api.getEllipsisProps({ index })}
          {...rest}
          className={cx("chakra-pagination__ellipsis", props.className)}
          __css={{
            ...styles.ellipsis,
          }}
          children={children}
        />
      </chakra.li>
    )
  },
)

PaginationEllipsis.displayName = "PaginationEllipsis"

type PageProps = Parameters<
  ReturnType<typeof usePaginationContext>["getItemProps"]
>[0]
export interface PaginationItemProps extends HTMLChakraProps<"a"> {
  rootProps?: HTMLChakraProps<"li">
  page: PageProps
}

/**
 * PaginationItem
 *
 * React component used to render the items in a pagination component
 *
 * It renders a `a` by default.
 *
 * @see Docs http://chakra-ui.com/components/pagination
 */
export const PaginationItem = forwardRef<PaginationItemProps, "ul">(
  function PaginationItem(props, ref) {
    const styles = usePaginationStyles()
    const api = usePaginationContext()
    const { rootProps, page, ...rest } = props

    return (
      <chakra.li {...rootProps}>
        <chakra.a
          ref={ref}
          {...api.getItemProps(page)}
          {...rest}
          className={cx("chakra-pagination__item", props.className)}
          __css={{
            ...styles.item,
          }}
        />
      </chakra.li>
    )
  },
)

PaginationItem.displayName = "PaginationItem"
