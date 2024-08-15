"use client"

import type { ButtonProps, TextProps } from "@chakra-ui/react"
import {
  Button,
  Pagination as ChakraPagination,
  IconButton,
  Text,
  createContext,
  usePaginationContext,
} from "@chakra-ui/react"
import { forwardRef, useMemo } from "react"
import {
  HiChevronLeft,
  HiChevronRight,
  HiMiniEllipsisHorizontal,
} from "react-icons/hi2"

interface ButtonVariantMap {
  current: ButtonProps["variant"]
  default: ButtonProps["variant"]
  ellipsis: ButtonProps["variant"]
}

type PaginationVariant = "outline" | "solid" | "subtle"

interface ButtonVariantContext {
  size: ButtonProps["size"]
  variantMap: ButtonVariantMap
}

const [RootPropsProvider, useRootProps] = createContext<ButtonVariantContext>({
  name: "RootPropsProvider",
})

export interface PaginationRootProps extends ChakraPagination.RootProps {
  size?: ButtonProps["size"]
  variant?: PaginationVariant
}

const variantMap: Record<PaginationVariant, ButtonVariantMap> = {
  outline: { default: "ghost", ellipsis: "plain", current: "outline" },
  solid: { default: "outline", ellipsis: "outline", current: "solid" },
  subtle: { default: "ghost", ellipsis: "plain", current: "subtle" },
}

export const PaginationRoot = forwardRef<HTMLDivElement, PaginationRootProps>(
  function PaginationRoot(props, ref) {
    const { size = "sm", variant = "outline", ...rest } = props
    return (
      <RootPropsProvider value={{ size, variantMap: variantMap[variant] }}>
        <ChakraPagination.Root ref={ref} {...rest} />
      </RootPropsProvider>
    )
  },
)

export const PaginationEllipsis = forwardRef<
  HTMLDivElement,
  ChakraPagination.EllipsisProps
>(function PaginationEllipsis(props, ref) {
  const { size, variantMap } = useRootProps()
  return (
    <ChakraPagination.Ellipsis ref={ref} {...props} asChild>
      <Button as="span" variant={variantMap.ellipsis} size={size}>
        <HiMiniEllipsisHorizontal />
      </Button>
    </ChakraPagination.Ellipsis>
  )
})

export const PaginationItem = forwardRef<
  HTMLButtonElement,
  ChakraPagination.ItemProps
>(function PaginationItem(props, ref) {
  const { page } = usePaginationContext()
  const current = page === props.value
  const { size, variantMap } = useRootProps()
  return (
    <ChakraPagination.Item ref={ref} {...props} asChild>
      <Button
        variant={current ? variantMap.current : variantMap.default}
        size={size}
      >
        {props.value}
      </Button>
    </ChakraPagination.Item>
  )
})

export const PaginationPrevTrigger = forwardRef<
  HTMLButtonElement,
  ChakraPagination.PrevTriggerProps
>(function PaginationPrevTrigger(props, ref) {
  const { size, variantMap } = useRootProps()
  return (
    <ChakraPagination.PrevTrigger ref={ref} asChild {...props}>
      <IconButton variant={variantMap.default} size={size}>
        <HiChevronLeft />
      </IconButton>
    </ChakraPagination.PrevTrigger>
  )
})

export const PaginationNextTrigger = forwardRef<
  HTMLButtonElement,
  ChakraPagination.NextTriggerProps
>(function PaginationNextTrigger(props, ref) {
  const { size, variantMap } = useRootProps()
  return (
    <ChakraPagination.NextTrigger ref={ref} asChild {...props}>
      <IconButton variant={variantMap.default} size={size}>
        <HiChevronRight />
      </IconButton>
    </ChakraPagination.NextTrigger>
  )
})

export const PaginationItems = (props: React.HTMLAttributes<HTMLElement>) => {
  return (
    <ChakraPagination.Context>
      {({ pages }) =>
        pages.map((page, index) => {
          return page.type === "ellipsis" ? (
            <PaginationEllipsis key={index} index={index} {...props} />
          ) : (
            <PaginationItem
              key={index}
              type="page"
              value={page.value}
              {...props}
            />
          )
        })
      }
    </ChakraPagination.Context>
  )
}

interface PageTextProps extends TextProps {
  format?: "short" | "compact" | "long"
}

export const PaginationPageText = (props: PageTextProps) => {
  const { format = "compact", ...rest } = props

  const { page, pages, pageRange, pageSize, totalPages } =
    usePaginationContext()

  // TODO: replace woth actual count (when resolved in zag.js)
  const count = totalPages * pageSize

  const content = useMemo(() => {
    if (format === "short") {
      return `${page} / ${pages.length}`
    }
    if (format === "compact") {
      return `${page} of ${pages.length}`
    }
    return `${pageRange.start + 1} - ${pageRange.end} of ${count}`
  }, [format, page, pages.length, pageRange])

  return (
    <Text fontWeight="medium" {...rest}>
      {content}
    </Text>
  )
}
