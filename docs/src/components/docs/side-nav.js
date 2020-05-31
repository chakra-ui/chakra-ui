import * as React from "react"
import { sortBy, upperFirst, camelCase, groupBy } from "lodash/fp"
import { graphql, useStaticQuery } from "gatsby"
import { Box, Heading, Badge } from "@chakra-ui/core"
import { ComponentLink, TopNavLink } from "./nav-link"

const sortNodes = sortBy(["frontmatter.order", "frontmatter.title"])
const groupNodesByCollection = groupBy("fields.collection")

const useSortedCollectionLinks = (collection) => {
  const { allMdx } = useStaticQuery(
    graphql`
      query LinksQuery {
        allMdx {
          nodes {
            frontmatter {
              title
              order
            }
            fields {
              slug
              collection
            }
          }
        }
      }
    `,
  )
  const sorted = sortNodes(allMdx.nodes)
  const grouped = groupNodesByCollection(sorted)
  return grouped[collection]
}

const MainLinks = () => {
  const nodes = useSortedCollectionLinks("main")

  return nodes.map(({ frontmatter, fields }) => (
    <TopNavLink key={frontmatter.title} href={fields.slug}>
      {frontmatter.title}
    </TopNavLink>
  ))
}

const ComponentLinks = () => {
  const nodes = useSortedCollectionLinks("components")

  return nodes.map(({ frontmatter: { title }, fields: { slug } }) => (
    <ComponentLink key={title} href={slug}>
      {upperFirst(camelCase(title))}
    </ComponentLink>
  ))
}

const UtilitiesLinks = () => {
  const nodes = useSortedCollectionLinks("utilities")

  return nodes.map(({ frontmatter, fields }) => (
    <ComponentLink key={frontmatter.title} href={fields.slug}>
      {frontmatter.title}
    </ComponentLink>
  ))
}

const ThemingLinks = () => {
  const nodes = useSortedCollectionLinks("theming")

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
    borderRightWidth="1px"
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
        <NavGroupHeading>
          <span>Theming</span>
          <Badge
            ml="3"
            variant="solid"
            colorScheme="purple"
            verticalAlign="baseline"
          >
            New
          </Badge>
        </NavGroupHeading>
        <ThemingLinks />
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
