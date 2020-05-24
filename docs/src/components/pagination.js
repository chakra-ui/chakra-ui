import React from "react"
import { Box, Link } from "@chakra-ui/core"
import { Link as GatsbyLink } from "gatsby"

export const Pagination = ({ previous, next }) => {
  return (
    <Box>
      <ul>
        {previous && (
          <li>
            <Link as={GatsbyLink} to={previous.fields.slug}>
              {previous.frontmatter.title}
            </Link>
          </li>
        )}
        {next && (
          <li>
            <Link as={GatsbyLink} to={next.fields.slug}>
              {next.frontmatter.title}
            </Link>
          </li>
        )}
      </ul>
    </Box>
  )
}
