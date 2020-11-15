import React from "react"
import {
  Icon,
  Text,
  HStack,
  Wrap,
  Link,
  useColorModeValue,
  LinkProps,
  WrapItem,
} from "@chakra-ui/react"
import { FaNpm, FaGithub } from "react-icons/fa"
import StorybookIcon from "./storybook-icon"

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
        color: useColorModeValue("gray.700", "whiteAlpha.900"),
        boxShadow: "sm",
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

export type ComponentLinksProps = {
  github?: { url: string }
  npm?: { package: string }
  storybook?: { url: string }
}
function ComponentLinks(props: ComponentLinkProps) {
  const { github, npm, storybook, ...rest } = props

  const githubLink = github?.url && (
    <WrapItem>
      <ComponentLink
        url={github.url}
        icon={FaGithub}
        iconColor={useColorModeValue("gray.600", "inherit")}
        iconSize="1rem"
      >
        View source
      </ComponentLink>
    </WrapItem>
  )

  const npmLink = npm?.package && (
    <WrapItem>
      <ComponentLink
        url={`https://www.npmjs.com/package/${npm.package}`}
        icon={FaNpm}
        iconSize="2rem"
        iconColor="red.500"
      >
        {npm.package}
      </ComponentLink>
    </WrapItem>
  )

  const storybookLink = storybook?.url && (
    <WrapItem>
      <ComponentLink
        url={storybook.url}
        icon={StorybookIcon}
        iconSize="1.25rem"
        iconColor="pink.500"
      >
        View storybook
      </ComponentLink>
    </WrapItem>
  )

  return (
    <Wrap mt="2rem" spacing="4" {...rest}>
      {githubLink}
      {npmLink}
      {storybookLink}
    </Wrap>
  )
}

export default ComponentLinks
