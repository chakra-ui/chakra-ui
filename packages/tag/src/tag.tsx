import * as React from "react"
import { chakra, PropsOf } from "@chakra-ui/system"
import { Icon, IconProps } from "@chakra-ui/icon"
import { __DEV__ } from "@chakra-ui/utils"

export type TagProps = PropsOf<typeof Tag>

/**
 * The tag component is used to label or categorize UI elements.
 *
 * To style the tag globally, change the styles in `theme.components.Tag`
 *
 * @see Docs https://chakra-ui.com/components/tag
 */
export const Tag = chakra("span", {
  themeKey: "Tag",
  baseStyle: {
    display: "inline-flex",
    verticalAlign: "top",
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
  baseStyle: { lineHeight: 1.2 },
})

TagLabel.defaultProps = {
  isTruncated: true,
}

if (__DEV__) {
  TagLabel.displayName = "TagLabel"
}

export const TagLeftIcon = (props: IconProps) => (
  <Icon verticalAlign="top" marginRight="0.5rem" {...props} />
)

if (__DEV__) {
  TagLeftIcon.displayName = "TagLeftIcon"
}

export const TagRightIcon = (props: IconProps) => (
  <Icon verticalAlign="top" marginLeft="0.5rem" {...props} />
)

if (__DEV__) {
  TagRightIcon.displayName = "TagRightIcon"
}

const TagCloseIcon = (props: IconProps) => (
  <Icon
    focusable="false"
    verticalAlign="inherit"
    role="presentation"
    boxSize="100%"
    viewBox="0 0 512 512"
    {...props}
  >
    <path
      fill="currentColor"
      d="M289.94 256l95-95A24 24 0 00351 127l-95 95-95-95a24 24 0 00-34 34l95 95-95 95a24 24 0 1034 34l95-95 95 95a24 24 0 0034-34z"
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
    width: "1.25rem",
    height: "1.25rem",
    borderRadius: "sm",
    marginLeft: "0.375rem",
    marginRight: "-1",
    display: "flex",
    alignItems: "center",
    transition: "all 0.2s",
    opacity: 0.5,
    _disabled: { opacity: 0.4 },
    outline: "0",
    _focus: {
      boxShadow: "outline",
      bg: "rgba(0, 0, 0, 0.14)",
    },
    _hover: { opacity: 0.8 },
    _active: { opacity: 1 },
  },
  attrs: {
    type: "button",
  },
})

/**
 * TagCloseButton
 *
 * The tag close button. This is used to close "remove" the tag
 *
 * @see Docs https://chakra-ui.com/components/tag
 */
export const TagCloseButton = (props: TagCloseButtonProps) => {
  const { isDisabled, children = <TagCloseIcon />, ...rest } = props
  return <StyledButton disabled={isDisabled} children={children} {...rest} />
}

if (__DEV__) {
  TagCloseButton.displayName = "TagCloseButton"
}
