import { Icon, IconProps } from "@chakra-ui/icon"
import {
  chakra,
  forwardRef,
  omitThemingProps,
  StylesProvider,
  SystemStyleObject,
  ThemingProps,
  useMultiStyleConfig,
  useStyles,
  HTMLChakraProps,
} from "@chakra-ui/system"
import { __DEV__ } from "@chakra-ui/utils"
import * as React from "react"

export interface TagProps
  extends HTMLChakraProps<"span">,
    ThemingProps<"Tag"> {}

/**
 * The tag component is used to label or categorize UI elements.
 * To style the tag globally, change the styles in `theme.components.Tag`
 * @see Docs https://chakra-ui.com/tag
 */
export const Tag = forwardRef<TagProps, "span">((props, ref) => {
  const styles = useMultiStyleConfig("Tag", props)
  const ownProps = omitThemingProps(props)

  const containerStyles: SystemStyleObject = {
    display: "inline-flex",
    verticalAlign: "top",
    alignItems: "center",
    maxWidth: "100%",
    ...styles.container,
  }

  return (
    <StylesProvider value={styles}>
      <chakra.span ref={ref} {...ownProps} __css={containerStyles} />
    </StylesProvider>
  )
})

if (__DEV__) {
  Tag.displayName = "Tag"
}

export interface TagLabelProps extends HTMLChakraProps<"span"> {}

export const TagLabel = forwardRef<TagLabelProps, "span">((props, ref) => {
  const styles = useStyles()
  return <chakra.span ref={ref} isTruncated {...props} __css={styles.label} />
})

if (__DEV__) {
  TagLabel.displayName = "TagLabel"
}

export const TagLeftIcon = forwardRef<IconProps, "svg">((props, ref) => (
  <Icon ref={ref} verticalAlign="top" marginEnd="0.5rem" {...props} />
))

if (__DEV__) {
  TagLeftIcon.displayName = "TagLeftIcon"
}

export const TagRightIcon = forwardRef<IconProps, "svg">((props, ref) => (
  <Icon ref={ref} verticalAlign="top" marginStart="0.5rem" {...props} />
))

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
  extends Omit<HTMLChakraProps<"button">, "disabled"> {
  isDisabled?: boolean
}

/**
 * TagCloseButton is used to close "remove" the tag
 * @see Docs https://chakra-ui.com/tag
 */
export const TagCloseButton: React.FC<TagCloseButtonProps> = (props) => {
  const { isDisabled, children, ...rest } = props

  const styles = useStyles()

  const btnStyles: SystemStyleObject = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    outline: "0",
    ...styles.closeButton,
  }

  return (
    <chakra.button
      {...rest}
      type="button"
      aria-label="close"
      disabled={isDisabled}
      __css={btnStyles}
    >
      {children || <TagCloseIcon />}
    </chakra.button>
  )
}

if (__DEV__) {
  TagCloseButton.displayName = "TagCloseButton"
}
