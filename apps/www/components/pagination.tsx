import { Box, HStack, Stack, StackProps, Text } from "@chakra-ui/react"
import Link, { LinkProps } from "next/link"
import { LuChevronLeft, LuChevronRight } from "react-icons/lu"

interface PaginationItemProps extends StackProps {
  href: LinkProps["href"]
  external?: boolean | undefined
}

const PaginationItem = (props: PaginationItemProps) => {
  const { children, href, external, ...rest } = props

  return (
    <Box
      flex="1"
      borderWidth="1px"
      focusRing="contain"
      focusRingWidth="2px"
      rounded="md"
      p="4"
      {...rest}
      asChild
    >
      {external ? (
        <a href={href as string} target="_blank" rel="noopener noreferrer">
          {children}
        </a>
      ) : (
        <Link href={href}>{children}</Link>
      )}
    </Box>
  )
}

interface PaginationProps extends StackProps {
  previous?: {
    title: string
    url?: LinkProps["href"]
    external?: boolean | undefined
  } | null
  next?: {
    title: string
    url?: LinkProps["href"]
    external?: boolean | undefined
  } | null
}

export const Pagination = (props: PaginationProps) => {
  const { previous, next, ...rest } = props

  return (
    <HStack {...rest}>
      {previous ? (
        <PaginationItem href={previous.url || "#"} external={previous.external}>
          <Stack gap="1" textAlign="start" textStyle="sm">
            <Text color="fg.muted">Previous</Text>
            <HStack
              display="inline-flex"
              justify="flex-start"
              fontWeight="medium"
            >
              <LuChevronLeft />
              {previous.title}
            </HStack>
          </Stack>
        </PaginationItem>
      ) : (
        <Box flex="1" />
      )}
      {next ? (
        <PaginationItem href={next.url || "#"} external={next.external}>
          <Stack gap="1" textAlign="end" textStyle="sm">
            <Text color="fg.muted">Next</Text>
            <HStack
              display="inline-flex"
              justify="flex-end"
              fontWeight="medium"
            >
              {next.title}
              <LuChevronRight />
            </HStack>
          </Stack>
        </PaginationItem>
      ) : (
        <Box flex="1" />
      )}
    </HStack>
  )
}
