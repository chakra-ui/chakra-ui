import { Flex, Heading, Link, Spacer, Text, SimpleGrid } from "@chakra-ui/core"
import { Link as GatsbyLink } from "gatsby"
import React from "react"

export const PaginationLink = (props) => {
  const { label, url, children, ...rest } = props
  return (
    <Link
      flex="1"
      borderWidth="1px"
      padding="4"
      borderRadius="md"
      bg="white"
      _hover={{
        boxShadow: "sm",
      }}
      as={GatsbyLink}
      to={url}
      {...rest}
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
    <SimpleGrid mt="12" spacing="40px" columns={2}>
      {previous ? (
        <PaginationLink label="Previous:" url={previous.fields.slug} rel="prev">
          {previous.frontmatter.title}
        </PaginationLink>
      ) : (
        <div />
      )}
      {next ? (
        <PaginationLink label="Next:" url={next.fields.slug} rel="next">
          {next.frontmatter.title}
        </PaginationLink>
      ) : (
        <div />
      )}
    </SimpleGrid>
  )
}
