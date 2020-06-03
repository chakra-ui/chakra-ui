import React from "react"
import { Icon, Text, HStack, Wrap, Link } from "@chakra-ui/core"
import { FaNpm, FaGithub } from "react-icons/fa"
import StorybookIcon from "./storybook-icon"

function ComponentLink(props) {
  const { icon, url, children, iconSize, iconColor, ...rest } = props
  return (
    <Link
      href={url}
      isExternal
      px="12px"
      display="flex"
      alignItems="center"
      minH="32px"
      borderWidth="1px"
      borderRadius="md"
      color="gray.600"
      _hover={{ color: "gray.700", boxShadow: "sm" }}
      {...rest}
    >
      <HStack>
        <Icon fontSize={iconSize} as={icon} color={iconColor} />
        <Text fontSize="sm" lineHeight="short">
          {children}
        </Text>
      </HStack>
    </Link>
  )
}

function ComponentLinks(props) {
  const { github, npm, storybook, ...rest } = props
  return (
    <Wrap mt="2rem" spacing="4" {...rest}>
      <ComponentLink
        url={github.url}
        icon={FaGithub}
        iconColor="gray.600"
        iconSize="1rem"
      >
        View on Github
      </ComponentLink>
      <ComponentLink
        url={npm.url}
        icon={FaNpm}
        iconSize="2rem"
        iconColor="red.500"
      >
        {npm.label}
      </ComponentLink>
      {storybook && (
        <ComponentLink
          url={storybook.url}
          icon={StorybookIcon}
          iconSize="1.25rem"
          iconColor="pink.500"
        >
          View storybook
        </ComponentLink>
      )}
    </Wrap>
  )
}

export default ComponentLinks
