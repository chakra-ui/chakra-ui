import * as React from "react"
import { sortBy, upperFirst, camelCase } from "lodash/fp"
import { graphql, useStaticQuery } from "gatsby"
import { Box, Heading } from "@chakra-ui/core"
import { ComponentLink, TopNavLink } from "./NavLink"

const sortByOrder = sortBy(["frontmatter.order"])
const sortByTitle = sortBy(["frontmatter.title"])

const useLinksQuery = () => {
  return useStaticQuery(
    graphql`
      query LinksQuery {
        main: allMdx(filter: { fields: { collection: { eq: "main" } } }) {
          nodes {
            frontmatter {
              title
              order
            }
            fields {
              slug
            }
          }
        }
        components: allMdx(
          filter: { fields: { collection: { eq: "components" } } }
        ) {
          nodes {
            frontmatter {
              title
            }
            fields {
              slug
            }
          }
        }
        utilities: allMdx(
          filter: { fields: { collection: { eq: "utilities" } } }
        ) {
          nodes {
            frontmatter {
              title
            }
            fields {
              slug
            }
          }
        }
      }
    `,
  )
}

const MainLinks = () => {
  const { main } = useLinksQuery()
  const nodes = sortByOrder(main.nodes)

  return nodes.map(({ frontmatter, fields }) => (
    <TopNavLink key={frontmatter.title} href={fields.slug}>
      {frontmatter.title}
    </TopNavLink>
  ))
}

const ComponentLinks = () => {
  const { components } = useLinksQuery()
  const nodes = sortByTitle(components.nodes)

  return nodes.map(({ frontmatter: { title }, fields: { slug } }) => (
    <ComponentLink key={title} href={slug}>
      {upperFirst(camelCase(title))}
    </ComponentLink>
  ))
}

const UtilitiesLinks = () => {
  const { utilities } = useLinksQuery()
  const nodes = sortByTitle(utilities.nodes)

  return nodes.map(({ frontmatter, fields }) => (
    <ComponentLink key={frontmatter.title} href={fields.slug}>
      {frontmatter.title}
    </ComponentLink>
  ))
}

const NavGroupHeading = (props) => (
  <Heading
    size="xs"
    color="gray.400"
    letterSpacing="wide"
    mb={2}
    textTransform="uppercase"
    {...props}
  />
)

export const SideNavContent = ({
  contentHeight = "calc(100vh - 4rem)",
  ...props
}) => (
  <Box
    top="4rem"
    position="relative"
    overflowY="auto"
    // borderRightWidth="1px"
    {...props}
  >
    <Box
      as="nav"
      height={contentHeight}
      aria-label="Main navigation"
      fontSize="sm"
      p="6"
    >
      <Box mb="8">
        <MainLinks />
      </Box>

      <Box mb="10">
        <NavGroupHeading>Components</NavGroupHeading>
        <ComponentLinks />
      </Box>

      <Box mb="10">
        <NavGroupHeading>Utilities</NavGroupHeading>
        <UtilitiesLinks />
      </Box>
    </Box>
  </Box>
)

const SideNavContainer = (props) => (
  <Box
    position="fixed"
    left="0"
    width="100%"
    height="100%"
    top="0"
    right="0"
    {...props}
  />
)

const SideNav = (props) => {
  return (
    <SideNavContainer {...props}>
      <SideNavContent />
    </SideNavContainer>
  )
}

export default SideNav
