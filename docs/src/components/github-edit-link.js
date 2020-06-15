import * as React from "react"
import { chakra, Icon, Stack, Link } from "@chakra-ui/core"
import { MdEdit } from "react-icons/md"
import { graphql, useStaticQuery } from "gatsby"

export const GithubLink = ({ path }) => {
  const {
    site: {
      siteMetadata: { repository },
    },
  } = useStaticQuery(graphql`
    query REPOSITORY_QUERY {
      site {
        siteMetadata {
          repository
        }
      }
    }
  `)

  if (!repository || !path) {
    return null
  }

  const href = `${repository}/blob/master${path}`
  return (
    <Link href={href} isExternal>
      <Stack
        direction="row"
        spacing={1}
        alignItems="center"
        fontSize="sm"
        opacity={0.7}
      >
        <Icon as={MdEdit} fontSize="1em" mr="1" />
        <chakra.span>Edit this page on GitHub</chakra.span>
      </Stack>
    </Link>
  )
}
