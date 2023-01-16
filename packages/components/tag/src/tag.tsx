import { Icon, IconProps } from "@chakra-ui/icon"
import { createContext } from "@chakra-ui/react-context"
import {
  chakra,
  forwardRef,
  HTMLChakraProps,
  omitThemingProps,
  SystemStyleObject,
  ThemingProps,
  useMultiStyleConfig,
} from "@chakra-ui/system"

const [TagStylesProvider, useTagStyles] = createContext<
  Record<string, SystemStyleObject>
>({
  name: `TagStylesContext`,
  errorMessage: `useTagStyles returned is 'undefined'. Seems you forgot to wrap the components in "<Tag />" `,
})

export { useTagStyles }

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
    <TagStylesProvider value={styles}>
      <chakra.span ref={ref} {...ownProps} __css={containerStyles} />
    </TagStylesProvider>
  )
})

Tag.displayName = "Tag"

export interface TagLabelProps extends HTMLChakraProps<"span"> {}

export const TagLabel = forwardRef<TagLabelProps, "span">((props, ref) => {
  const styles = useTagStyles()
  return <chakra.span ref={ref} noOfLines={1} {...props} __css={styles.label} />
})

TagLabel.displayName = "TagLabel"

export const TagLeftIcon = forwardRef<IconProps, "svg">((props, ref) => (
  <Icon ref={ref} verticalAlign="top" marginEnd="0.5rem" {...props} />
))

TagLeftIcon.displayName = "TagLeftIcon"

export const TagRightIcon = forwardRef<IconProps, "svg">((props, ref) => (
  <Icon ref={ref} verticalAlign="top" marginStart="0.5rem" {...props} />
))

TagRightIcon.displayName = "TagRightIcon"

const TagCloseIcon: React.FC<IconProps> = (props) => (
  <Icon verticalAlign="inherit" viewBox="0 0 512 512" {...props}>
    <path
      fill="currentColor"
      d="M289.94 256l95-95A24 24 0 00351 127l-95 95-95-95a24 24 0 00-34 34l95 95-95 95a24 24 0 1034 34l95-95 95 95a24 24 0 0034-34z"
    />
  </Icon>
)

TagCloseIcon.displayName = "TagCloseIcon"

export interface TagCloseButtonProps
  extends Omit<HTMLChakraProps<"button">, "disabled"> {
  /**
   * @default false
   */
  isDisabled?: boolean
}

/**
 * TagCloseButton is used to close "remove" the tag
 * @see Docs https://chakra-ui.com/tag
 */
export const TagCloseButton = forwardRef<TagCloseButtonProps, "button">(
  (props, ref) => {
    const { isDisabled, children, ...rest } = props

    const styles = useTagStyles()

    const btnStyles: SystemStyleObject = {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      outline: "0",
      ...styles.closeButton,
    }

    return (
      <chakra.button
        ref={ref}
        aria-label="close"
        {...rest}
        type="button"
        disabled={isDisabled}
        __css={btnStyles}
      >
        {children || <TagCloseIcon />}
      </chakra.button>
    )
  },
)

TagCloseButton.displayName = "TagCloseButton"
