import React from "react"
import { chakra, PropsOf } from "@chakra-ui/system"
import { Icon, IconProps } from "@chakra-ui/icon"

export type TagProps = PropsOf<typeof Tag>

/**
 * Tag
 *
 * The tag component is used to label or categorize UI elements.
 *
 * To style the element, change the styles in
 * `theme.components.Tag`
 */

export const Tag = chakra("span", {
  themeKey: "Tag",
  baseStyle: {
    display: "inline-flex",
    alignItems: "center",
    maxWidth: "100%",
    fontWeight: "medium",
    lineHeight: "1.2",
  },
})

export type TagLabelProps = PropsOf<typeof chakra.div>

/**
 * TagLabel
 *
 * The text label of the tag
 */

export const TagLabel = (props: TagLabelProps) => (
  <chakra.span
    data-chakra-tag-label=""
    isTruncated
    lineHeight="1.2"
    {...props}
  />
)

/**
 * TagIcon
 *
 * The tag icon. This can be positioned on either side of the tag
 */

export const TagIcon = (props: IconProps) => (
  <Icon
    data-chakra-tag-icon=""
    verticalAlign="top"
    mx="0.5rem"
    {...props}
    sx={{
      "&:first-child": { marginLeft: 0 },
      "&:last-child": { marginRight: 0 },
    }}
  />
)

/**
 * TagCloseIcon
 *
 * The icon of the tag close button
 */

const TagCloseIcon = (props: IconProps) => (
  <Icon focusable="false" role="presentation" size="100%" {...props}>
    <path
      fill="currentColor"
      d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
    />
  </Icon>
)

export type TagCloseButtonProps = Omit<
  PropsOf<typeof chakra.button>,
  "disabled"
> & {
  isDisabled?: boolean
}

/**
 * TagCloseButton
 *
 * The tag close button. This is used to close "remove" the tag
 */

export const TagCloseButton = (props: TagCloseButtonProps) => {
  const {
    isDisabled,
    children = <TagCloseIcon verticalAlign="inherit" />,
    ...rest
  } = props
  return (
    <chakra.button
      fontSize="1em"
      size="1em"
      borderRadius="sm"
      marginLeft="6px"
      _disabled={{ opacity: 0.4 }}
      outline="0"
      _focus={{
        boxShadow: "outline",
        bg: "rgba(0, 0, 0, 0.14)",
      }}
      _hover={{ opacity: 0.8 }}
      _active={{ opacity: 1 }}
      disabled={isDisabled}
      children={children}
      {...rest}
    />
  )
}
