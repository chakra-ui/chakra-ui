import * as React from "react"
import {
  chakra,
  forwardRef,
  PropsOf,
  ThemingProps,
  useMultiStyleConfig,
  StylesProvider,
  omitThemingProps,
  useStyles,
} from "@chakra-ui/system"
import { Icon, IconProps } from "@chakra-ui/icon"
import { __DEV__ } from "@chakra-ui/utils"

export type TagProps = PropsOf<typeof chakra.span> & ThemingProps

/**
 * The tag component is used to label or categorize UI elements.
 * To style the tag globally, change the styles in `theme.components.Tag`
 * @see Docs https://chakra-ui.com/components/tag
 */
export const Tag = forwardRef<TagProps>(function Tag(props, ref) {
  const styles = useMultiStyleConfig("Tag", props)
  const _props = omitThemingProps(props)

  const containerStyles = {
    display: "inline-flex",
    verticalAlign: "top",
    alignItems: "center",
    maxWidth: "100%",
    ...styles.container,
  }

  return (
    <StylesProvider value={styles}>
      <chakra.span ref={ref} {..._props} __css={containerStyles} />
    </StylesProvider>
  )
})

if (__DEV__) {
  Tag.displayName = "Tag"
}

export type TagLabelProps = PropsOf<typeof chakra.span>

export function TagLabel(props: TagLabelProps) {
  const styles = useStyles()
  return <chakra.span isTruncated {...props} __css={styles.label} />
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

/**
 * TagCloseButton
 *
 * The tag close button. This is used to close "remove" the tag
 *
 * @see Docs https://chakra-ui.com/components/tag
 */
export const TagCloseButton = (props: TagCloseButtonProps) => {
  const { isDisabled, children = <TagCloseIcon />, ...rest } = props

  const styles = useStyles()
  const btnStyles = {
    display: "flex",
    alignItems: "center",
    outline: "0",
    transition: "all 0.2s",
    ...styles.closeButton,
  }

  return (
    <chakra.button
      {...rest}
      type="button"
      disabled={isDisabled}
      children={children}
      __css={btnStyles}
    />
  )
}

if (__DEV__) {
  TagCloseButton.displayName = "TagCloseButton"
}
