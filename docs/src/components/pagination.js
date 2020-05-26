import { Link, SimpleGrid, Text, useColorModeValue } from "@chakra-ui/core"
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons"
import { Link as GatsbyLink } from "gatsby"
import React from "react"

export const PaginationLink = (props) => {
  const { label, url, children, ...rest } = props

  const bg = useColorModeValue("white", "gray.800")
  const hoverBg = useColorModeValue("gray.50", "whiteAlpha.50")

  return (
    <Link
      flex="1"
      borderWidth="1px"
      padding="4"
      bg={bg}
      borderRadius="md"
      _hover={{
        bg: hoverBg,
      }}
      as={GatsbyLink}
      to={url}
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

export const Pagination = ({ previous, next }) => {
  return (
    <SimpleGrid mt="12" spacing="40px" columns={2}>
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
