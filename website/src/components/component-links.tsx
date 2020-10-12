import {
  Icon,
  Text,
  HStack,
  Wrap,
  Link,
  useColorModeValue,
  LinkProps,
  WrapProps,
} from "@chakra-ui/core"
import React from "react"
import { FaNpm, FaGithub } from "react-icons/fa"

import { StorybookIcon } from "./storybook-icon"

type ComponentLinkProps = LinkProps & {
  icon: React.ElementType
  url: string
  iconSize?: string
  iconColor?: string
}

function ComponentLink(props: ComponentLinkProps) {
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
        boxShadow: "sm",
        color: useColorModeValue("gray.700", "whiteAlpha.900"),
        transform: "translateY(-1px)",
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

type ComponentLinksProps = WrapProps & {
  github: { url: string }
  npm: { url: string; label: string }
  storybook: { url: string }
}

// eslint-disable-next-line import/no-default-export
export default function ComponentLinks(
  props: ComponentLinksProps,
): JSX.Element {
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
