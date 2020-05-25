import React from "react"
import { Box, Link, Text, Flex, Heading, Spacer } from "@chakra-ui/core"
import { Link as GatsbyLink } from "gatsby"

export const PaginationLink = (props) => {
  const { label, url, children } = props
  return (
    <Link
      flex="1"
      borderWidth="1px"
      padding="4"
      borderRadius="md"
      _hover={{
        bg: "teal.50",
        color: "teal.800",
        borderColor: "teal.100",
      }}
      as={GatsbyLink}
      to={url}
    >
      <Text fontSize="sm" fontWeight="semibold">
        {label}
      </Text>
      <Heading mt="1" size="md">
        {children}
      </Heading>
    </Link>
  )
}

export const Pagination = ({ previous, next }) => {
  return (
    <Flex mt="12">
      <PaginationLink label="Previous:" url={previous.fields.slug}>
        {previous.frontmatter.title}
      </PaginationLink>
      <Spacer maxWidth="32px" />
      <PaginationLink label="Next:" url={next.fields.slug}>
        {next.frontmatter.title}
      </PaginationLink>
    </Flex>
  )
}
