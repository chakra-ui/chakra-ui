import { Box, Heading, useColorModeValue } from "@chakra-ui/core"
import * as React from "react"
import { ComponentLink } from "./nav-link"

function LinkGroup(props) {
  const { title, collection, ...rest } = props
  const nodes = []

  return (
    <Box mb="10" {...rest}>
      {title && <LinkGroupHeading>{title}</LinkGroupHeading>}
      {nodes.map(({ frontmatter, fields }) => (
        <ComponentLink key={frontmatter.title} href={fields.slug}>
          {frontmatter.title}
        </ComponentLink>
      ))}
    </Box>
  )
}

const LinkGroupHeading = (props) => (
  <Heading
    size="xs"
    color={useColorModeValue("gray.700", "inherit")}
    letterSpacing="wide"
    mb={4}
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
      px="6"
      pt="10"
      pb="6"
    >
      <LinkGroup collection="main" title="Getting Started" />
      <LinkGroup collection="theming" title="Theming" />
      <LinkGroup collection="layout" title="Layout" />
      <LinkGroup collection="form" title="Form" />
      <LinkGroup collection="components" title="Components" />
      <LinkGroup collection="hooks" title="Hooks" />
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
    <SideNavContainer as="aside" {...props}>
      <SideNavContent />
    </SideNavContainer>
  )
}

export default SideNav
