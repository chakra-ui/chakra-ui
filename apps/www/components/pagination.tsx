import { Box, HStack, Span, StackProps } from "@chakra-ui/react"
import Link, { LinkProps } from "next/link"
import { LuChevronLeft, LuChevronRight } from "react-icons/lu"

interface PaginationItemProps extends StackProps {
  startIcon?: React.ReactNode
  endIcon?: React.ReactNode
  href: LinkProps["href"]
}

const PaginationItem = (props: PaginationItemProps) => {
  const { startIcon, endIcon, children, href, ...rest } = props
  return (
    <HStack
      flex="1"
      fontWeight="medium"
      focusRing="contain"
      focusRingWidth="2px"
      rounded="md"
      {...rest}
      asChild
    >
      <Link href={href}>
        {startIcon}
        <Span>{children}</Span>
        {endIcon}
      </Link>
    </HStack>
  )
}

interface PaginationProps extends StackProps {
  previous?: { label: string; href: LinkProps["href"] }
  next?: { label: string; href: LinkProps["href"] }
}

export const Pagination = (props: PaginationProps) => {
  const { previous, next, ...rest } = props
  return (
    <HStack {...rest}>
      {previous ? (
        <PaginationItem
          startIcon={<LuChevronLeft />}
          href={previous.href}
          justify="flex-start"
        >
          {previous.label}
        </PaginationItem>
      ) : (
        <Box flex="1" />
      )}
      {next ? (
        <PaginationItem
          endIcon={<LuChevronRight />}
          href={next.href}
          justify="flex-end"
        >
          {next.label}
        </PaginationItem>
      ) : (
        <Box flex="1" />
      )}
    </HStack>
  )
}
