import React from "react"
import {
  Icon,
  Text,
  HStack,
  Wrap,
  Link,
  useColorModeValue,
} from "@chakra-ui/core"
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
      color={useColorModeValue("gray.600", "whiteAlpha.700")}
      _hover={{
        color: useColorModeValue("gray.700", "whiteAlpha.900"),
        boxShadow: "sm",
      }}
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
        iconColor={useColorModeValue("gray.600", "inherit")}
        iconSize="1rem"
      >
        View source
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
