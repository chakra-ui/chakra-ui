/**@jsx jsx */
import React from "react"
import { chakra, PropsOf, jsx, createChakra } from "@chakra-ui/system"
import { Icon, IconProps } from "@chakra-ui/icon"

export const Tag = createChakra("span", {
  themeKey: "Tag",
  baseStyle: {
    display: "inline-flex",
    alignItems: "center",
    maxWidth: "100%",
    fontWeight: "medium",
    lineHeight: "1.2",
  },
  attrs: {
    //@ts-ignore
    "data-chakra-tag": "",
    // tabIndex: -1,
  },
})

export const TagLabel = (props: PropsOf<typeof chakra.div>) => (
  <chakra.span
    data-chakra-tag-label=""
    isTruncated
    lineHeight="1.2"
    {...props}
  />
)

export const TagIcon = (props: IconProps) => (
  <Icon
    data-chakra-tag-icon=""
    mx="0.5rem"
    {...props}
    sx={{
      "&:first-child": { marginLeft: 0 },
      "&:last-child": { marginRight: 0 },
    }}
  />
)

const TagCloseIcon = (props: IconProps) => (
  <Icon {...props}>
    <path
      d="M9.41 8l2.29-2.29c.19-.18.3-.43.3-.71a1.003 1.003 0 0 0-1.71-.71L8 6.59l-2.29-2.3a1.003 1.003 0 0 0-1.42 1.42L6.59 8 4.3 10.29c-.19.18-.3.43-.3.71a1.003 1.003 0 0 0 1.71.71L8 9.41l2.29 2.29c.18.19.43.3.71.3a1.003 1.003 0 0 0 .71-1.71L9.41 8z"
      fill="currentColor"
      fillRule="evenodd"
    />
  </Icon>
)

export const TagCloseButton = ({
  isDisabled,
  ...props
}: {
  isDisabled?: boolean
}) => (
  <chakra.button
    data-chakra-tag-close-btn=""
    display="flex"
    opacity={0.5}
    mt="-2px"
    mr="-6px"
    size="1.25rem"
    outline="none"
    cursor="pointer"
    color="inherit"
    padding="2px 2px 2px 0"
    _disabled={{ opacity: 0.4 }}
    _focus={{
      boxShadow: "outline",
      bg: "rgba(0, 0, 0, 0.14)",
    }}
    _hover={{ opacity: 0.8 }}
    _active={{ opacity: 1 }}
    disabled={isDisabled}
    {...props}
  >
    <TagCloseIcon />
  </chakra.button>
)
