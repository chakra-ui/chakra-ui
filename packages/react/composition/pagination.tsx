"use client"

import type { RecipeProps } from "@chakra-ui/react"
import {
  Button,
  Pagination as ChakraPagination,
  IconButton,
  Wrap,
  createContext,
  usePaginationContext,
} from "@chakra-ui/react"
import { forwardRef } from "react"
import { FaEllipsisH } from "react-icons/fa"
import { HiChevronLeft, HiChevronRight } from "react-icons/hi"

interface ButtonVariantProps extends RecipeProps<"button"> {}

interface ButtonVariantContext {
  size?: ButtonVariantProps["size"]
}

export interface PaginationProps
  extends ChakraPagination.RootProps,
    ButtonVariantContext {}

export const Pagination = forwardRef<HTMLDivElement, PaginationProps>(
  function Pagination(props, ref) {
    const { size = "sm", ...rest } = props
    return (
      <ButtonVariantProvider value={{ size }}>
        <ChakraPagination.Root ref={ref} {...rest}>
          <Wrap>
            <PaginationPrevTrigger />
            <PaginationItems />
            <PaginationNextTrigger />
          </Wrap>
        </ChakraPagination.Root>
      </ButtonVariantProvider>
    )
  },
)

const [ButtonVariantProvider, useButtonVariant] =
  createContext<ButtonVariantContext>({
    name: "ButtonVariantContext",
  })

const Ellipsis = forwardRef<HTMLDivElement, ChakraPagination.EllipsisProps>(
  function Ellipsis(props, ref) {
    const { size } = useButtonVariant()
    return (
      <ChakraPagination.Ellipsis ref={ref} index={props.index} asChild>
        <Button variant="plain" size={size}>
          <FaEllipsisH />
        </Button>
      </ChakraPagination.Ellipsis>
    )
  },
)

const Item = forwardRef<HTMLButtonElement, ChakraPagination.ItemProps>(
  function Item(props, ref) {
    const { page } = usePaginationContext()
    const current = page === props.value
    const { size } = useButtonVariant()
    return (
      <ChakraPagination.Item ref={ref} {...props} asChild>
        <Button variant={current ? "solid" : "outline"} size={size}>
          {props.value}
        </Button>
      </ChakraPagination.Item>
    )
  },
)

const PaginationPrevTrigger = forwardRef<
  HTMLButtonElement,
  ChakraPagination.PrevTriggerProps
>(function PaginationPrevTrigger(props, ref) {
  const { size } = useButtonVariant()
  return (
    <ChakraPagination.PrevTrigger ref={ref} asChild {...props}>
      <IconButton variant="outline" size={size}>
        <HiChevronLeft />
      </IconButton>
    </ChakraPagination.PrevTrigger>
  )
})

const PaginationNextTrigger = forwardRef<
  HTMLButtonElement,
  ChakraPagination.NextTriggerProps
>(function PaginationNextTrigger(props, ref) {
  const { size } = useButtonVariant()
  return (
    <ChakraPagination.NextTrigger ref={ref} asChild {...props}>
      <IconButton variant="outline" size={size}>
        <HiChevronRight />
      </IconButton>
    </ChakraPagination.NextTrigger>
  )
})

const PaginationItems = () => {
  return (
    <ChakraPagination.Context>
      {({ pages }) =>
        pages.map((page, index) => {
          return page.type === "ellipsis" ? (
            <Ellipsis key={index} index={index} />
          ) : (
            <Item type="page" value={page.value} />
          )
        })
      }
    </ChakraPagination.Context>
  )
}
