import React from "react"
import { chakra, PropsOf } from "@chakra-ui/system"
import { Icon, IconProps } from "@chakra-ui/icon"
import { __DEV__ } from "@chakra-ui/utils"

export type TagProps = PropsOf<typeof Tag>

/**
 * The tag component is used to label or categorize UI elements.
 *
 * To style the tag globally, change the styles in `theme.components.Tag`
 *
 * @see Docs https://chakra-ui/tag
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

if (__DEV__) {
  Tag.displayName = "Tag"
}

export type TagLabelProps = PropsOf<typeof TagLabel>

export const TagLabel = chakra("span", {
  baseStyle: {
    isTruncated: true,
    lineHeight: 1.2,
  },
})

if (__DEV__) {
  TagLabel.displayName = "TagLabel"
}

/**
 * TagIcon
 *
 * Tag component used on either side of the tag label
 */
export const TagIcon = (props: IconProps) => (
  <Icon
    data-chakra-tag-icon=""
    verticalAlign="top"
    marginX="0.5rem"
    _first={{ marginLeft: 0 }}
    _last={{ marginRight: 0 }}
    {...props}
  />
)

if (__DEV__) {
  TagIcon.displayName = "TagIcon"
}

const TagCloseIcon = (props: IconProps) => (
  <Icon focusable="false" role="presentation" size="100%" {...props}>
    <path
      fill="currentColor"
      d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
    />
  </Icon>
)

if (__DEV__) {
  TagCloseIcon.displayName = "TagCloseIcon"
}

export type TagCloseButtonProps = Omit<
  PropsOf<typeof chakra.button>,
  "disabled"
> & {
  isDisabled?: boolean
}

const StyledButton = chakra("button", {
  baseStyle: {
    fontSize: "1em",
    width: "1em",
    height: "1em",
    borderRadius: "sm",
    marginLeft: "6px",
    display: "flex",
    alignItems: "center",
    _disabled: { opacity: 0.4 },
    outline: "0",
    _focus: {
      boxShadow: "outline",
      bg: "rgba(0, 0, 0, 0.14)",
    },
    _hover: { opacity: 0.8 },
    _active: { opacity: 1 },
  },
})

/**
 * TagCloseButton
 *
 * The tag close button. This is used to close "remove" the tag
 *
 * @see Docs https://chakra-ui/tag
 */
export const TagCloseButton = (props: TagCloseButtonProps) => {
  const {
    isDisabled,
    children = <TagCloseIcon verticalAlign="inherit" />,
    ...rest
  } = props
  return <StyledButton disabled={isDisabled} children={children} {...rest} />
}

if (__DEV__) {
  TagCloseButton.displayName = "TagCloseButton"
}
