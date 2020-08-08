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

export interface TagProps extends PropsOf<typeof chakra.span>, ThemingProps {}

/**
 * The tag component is used to label or categorize UI elements.
 * To style the tag globally, change the styles in `theme.components.Tag`
 * @see Docs https://chakra-ui.com/components/tag
 */
export const Tag = forwardRef<TagProps, "span">(function Tag(props, ref) {
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

export interface TagLabelProps extends PropsOf<typeof chakra.span> {}

export const TagLabel: React.FC<TagLabelProps> = (props) => {
  const styles = useStyles()
  return <chakra.span isTruncated {...props} __css={styles.label} />
}

if (__DEV__) {
  TagLabel.displayName = "TagLabel"
}

export const TagLeftIcon: React.FC<IconProps> = (props) => (
  <Icon verticalAlign="top" mr="0.5rem" {...props} />
)

if (__DEV__) {
  TagLeftIcon.displayName = "TagLeftIcon"
}

export const TagRightIcon: React.FC<IconProps> = (props) => (
  <Icon verticalAlign="top" ml="0.5rem" {...props} />
)

if (__DEV__) {
  TagRightIcon.displayName = "TagRightIcon"
}

const TagCloseIcon: React.FC<IconProps> = (props) => (
  <Icon verticalAlign="inherit" viewBox="0 0 512 512" {...props}>
    <path
      fill="currentColor"
      d="M289.94 256l95-95A24 24 0 00351 127l-95 95-95-95a24 24 0 00-34 34l95 95-95 95a24 24 0 1034 34l95-95 95 95a24 24 0 0034-34z"
    />
  </Icon>
)

if (__DEV__) {
  TagCloseIcon.displayName = "TagCloseIcon"
}

export interface TagCloseButtonProps
  extends Omit<PropsOf<typeof chakra.button>, "disabled"> {
  isDisabled?: boolean
}

/**
 * TagCloseButton is used to close "remove" the tag
 * @see Docs https://chakra-ui.com/components/tag
 */
export const TagCloseButton: React.FC<TagCloseButtonProps> = (props) => {
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
