"use client"

import type { RecipeProps } from "@chakra-ui/react"
import {
  Button,
  Pagination as ChakraPagination,
  HStack,
  IconButton,
  Span,
  Text,
  Wrap,
  createContext,
  usePaginationContext,
} from "@chakra-ui/react"
import { forwardRef } from "react"
import {
  HiChevronLeft,
  HiChevronRight,
  HiMiniEllipsisHorizontal,
} from "react-icons/hi2"

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

export interface SimplePaginationProps extends PaginationProps {
  showPageText?: boolean
}

export const SimplePagination = forwardRef<
  HTMLDivElement,
  SimplePaginationProps
>(function SimplePagination(props, ref) {
  const { size = "sm", showPageText, ...rest } = props
  return (
    <ButtonVariantProvider value={{ size }}>
      <ChakraPagination.Root ref={ref} {...rest}>
        <HStack>
          <PaginationPrevTrigger />
          {showPageText && <PaginationPageText />}
          <PaginationNextTrigger />
        </HStack>
      </ChakraPagination.Root>
    </ButtonVariantProvider>
  )
})

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
          <HiMiniEllipsisHorizontal />
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
            <Item key={index} type="page" value={page.value} />
          )
        })
      }
    </ChakraPagination.Context>
  )
}

const PaginationPageText = () => {
  const { page, pages } = usePaginationContext()
  return (
    <Text color="fg.subtle" fontWeight="medium" marginX="3">
      Page <Span color="fg">{page}</Span> of{" "}
      <Span color="fg">{pages.length}</Span>
    </Text>
  )
}
