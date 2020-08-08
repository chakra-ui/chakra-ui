import { Link, SimpleGrid, Text } from "@chakra-ui/core"
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons"
import NextLink from "next/link"
import React from "react"

export const PaginationLink = (props) => {
  const { label, href, children, ...rest } = props

  return (
    <NextLink href={href} passHref>
      <Link
        _hover={{
          textDecor: "none",
        }}
        flex="1"
        borderRadius="md"
        {...rest}
      >
        <Text fontSize="sm" px="2">
          {label}
        </Text>
        <Text mt="1" fontSize="lg" fontWeight="bold" color="teal.400">
          {children}
        </Text>
      </Link>
    </NextLink>
  )
}

export const Pagination = ({ previous, next, ...rest }) => {
  return (
    <SimpleGrid
      as="nav"
      aria-label="pagination"
      spacing="40px"
      my="64px"
      columns={2}
      {...rest}
    >
      {previous ? (
        <PaginationLink
          textAlign="left"
          label="Previous"
          href={previous.path}
          rel="prev"
        >
          <ChevronLeftIcon mr="1" fontSize="1.2em" />
          {previous.title}
        </PaginationLink>
      ) : (
        <div />
      )}
      {next ? (
        <PaginationLink
          textAlign="right"
          label="Next"
          href={next.path}
          rel="next"
        >
          {next.title}
          <ChevronRightIcon ml="1" fontSize="1.2em" />
        </PaginationLink>
      ) : (
        <div />
      )}
    </SimpleGrid>
  )
}

export default Pagination
