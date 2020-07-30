import { Link, SimpleGrid, Text } from "@chakra-ui/core"
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons"
import NextLink from "next/link"
import React from "react"

export const PaginationLink = (props) => {
  const { label, url, children, ...rest } = props

  return (
    <Link
      _hover={{
        textDecor: "none",
      }}
      flex="1"
      borderRadius="md"
      as={NextLink}
      href={url}
      {...rest}
    >
      <Text fontSize="sm" paddingX="2">
        {label}
      </Text>
      <Text mt="1" fontSize="md" fontWeight="bold" color="teal.400">
        {children}
      </Text>
    </Link>
  )
}

export const Pagination = ({ previous, next, ...rest }) => {
  return (
    <SimpleGrid
      as="nav"
      aria-label="pagination"
      spacing="40px"
      columns={2}
      {...rest}
    >
      {previous ? (
        <PaginationLink
          textAlign="left"
          label="Previous"
          url={previous.fields.slug}
          rel="prev"
        >
          <ChevronLeftIcon mr="1" fontSize="1.2em" />
          {previous.frontmatter.title}
        </PaginationLink>
      ) : (
        <div />
      )}
      {next ? (
        <PaginationLink
          textAlign="right"
          label="Next"
          url={next.fields.slug}
          rel="next"
        >
          {next.frontmatter.title}
          <ChevronRightIcon ml="1" fontSize="1.2em" />
        </PaginationLink>
      ) : (
        <div />
      )}
    </SimpleGrid>
  )
}
