import {
  chakra,
  forwardRef,
  omitThemingProps,
  StylesProvider,
  SystemProps,
  SystemStyleObject,
  ThemingProps,
  useMultiStyleConfig,
  useStyles,
  HTMLChakraProps,
} from "@chakra-ui/system"
import { cx, __DEV__ } from "@chakra-ui/utils"
import { getValidChildren } from "@chakra-ui/react-utils"
import * as React from "react"

export interface BreadcrumbSeparatorProps extends HTMLChakraProps<"div"> {
  /**
   * @type SystemProps["mx"]
   */
  spacing?: SystemProps["mx"]
}

/**
 * React component that separates each breadcrumb link
 */
export const BreadcrumbSeparator = forwardRef<BreadcrumbSeparatorProps, "span">(
  (props, ref) => {
    const { spacing, ...rest } = props

    const styles = useStyles()
    const separatorStyles: SystemStyleObject = {
      mx: spacing,
      ...styles.separator,
    }

    return (
      <chakra.span
        ref={ref}
        role="presentation"
        {...rest}
        __css={separatorStyles}
      />
    )
  },
)

if (__DEV__) {
  BreadcrumbSeparator.displayName = "BreadcrumbSeparator"
}

export interface BreadcrumbLinkProps extends HTMLChakraProps<"a"> {
  isCurrentPage?: boolean
}

/**
 * Breadcrumb link.
 *
 * It renders a `span` when it matches the current link. Otherwise,
 * it renders an anchor tag.
 */
export const BreadcrumbLink = forwardRef<BreadcrumbLinkProps, "a">(
  (props, ref) => {
    const { isCurrentPage, as, className, href, ...rest } = props
    const styles = useStyles()

    const sharedProps = {
      ref,
      as,
      className: cx("chakra-breadcrumb__link", className),
      ...rest,
    }

    if (isCurrentPage) {
      return (
        <chakra.span aria-current="page" __css={styles.link} {...sharedProps} />
      )
    }

    return <chakra.a __css={styles.link} href={href} {...sharedProps} />
  },
)

if (__DEV__) {
  BreadcrumbLink.displayName = "BreadcrumbLink"
}

interface BreadcrumbItemOptions extends BreadcrumbOptions {
  isCurrentPage?: boolean
  isLastChild?: boolean
}

export interface BreadcrumbItemProps
  extends BreadcrumbItemOptions,
    HTMLChakraProps<"li"> {}

/**
 * BreadcrumbItem is used to group a breadcrumb link.
 * It renders a `li` element to denote it belongs to an order list of links.
 *
 * @see Docs https://chakra-ui.com/breadcrumb
 */
export const BreadcrumbItem = forwardRef<BreadcrumbItemProps, "li">(
  (props, ref) => {
    const {
      isCurrentPage,
      separator,
      isLastChild,
      spacing,
      children,
      className,
      ...rest
    } = props

    const validChildren = getValidChildren(children)

    const clones = validChildren.map((child) => {
      if (child.type === BreadcrumbLink) {
        return React.cloneElement(child, {
          isCurrentPage,
        })
      }

      if (child.type === BreadcrumbSeparator) {
        return React.cloneElement(child, {
          spacing,
          children: child.props.children || separator,
        })
      }

      return child
    })

    const styles = useStyles()
    const itemStyles: SystemStyleObject = {
      display: "inline-flex",
      alignItems: "center",
      ...styles.item,
    }

    const _className = cx("chakra-breadcrumb__list-item", className)

    return (
      <chakra.li ref={ref} className={_className} {...rest} __css={itemStyles}>
        {clones}
        {!isLastChild && (
          <BreadcrumbSeparator spacing={spacing}>
            {separator}
          </BreadcrumbSeparator>
        )}
      </chakra.li>
    )
  },
)

if (__DEV__) {
  BreadcrumbItem.displayName = "BreadcrumbItem"
}

export interface BreadcrumbOptions {
  /**
   * The visual separator between each breadcrumb item
   * @type string | React.ReactElement
   */
  separator?: string | React.ReactElement
  /**
   * The left and right margin applied to the separator
   * @type SystemProps["mx"]
   */
  spacing?: SystemProps["mx"]
}

export interface BreadcrumbProps
  extends HTMLChakraProps<"nav">,
    BreadcrumbOptions,
    ThemingProps<"Breadcrumb"> {}

/**
 * Breadcrumb is used to render a breadcrumb navigation landmark.
 * It renders a `nav` element with `aria-label` set to `Breadcrumb`
 *
 * @see Docs https://chakra-ui.com/breadcrumb
 */
export const Breadcrumb = forwardRef<BreadcrumbProps, "nav">((props, ref) => {
  const styles = useMultiStyleConfig("Breadcrumb", props)
  const ownProps = omitThemingProps(props)

  const {
    children,
    spacing = "0.5rem",
    separator = "/",
    className,
    ...rest
  } = ownProps

  const validChildren = getValidChildren(children)
  const count = validChildren.length

  const clones = validChildren.map((child, index) =>
    React.cloneElement(child, {
      separator,
      spacing,
      isLastChild: count === index + 1,
    }),
  )

  const _className = cx("chakra-breadcrumb", className)

  return (
    <chakra.nav
      ref={ref}
      aria-label="breadcrumb"
      className={_className}
      __css={styles.container}
      {...rest}
    >
      <StylesProvider value={styles}>
        <chakra.ol className="chakra-breadcrumb__list">{clones}</chakra.ol>
      </StylesProvider>
    </chakra.nav>
  )
})

if (__DEV__) {
  Breadcrumb.displayName = "Breadcrumb"
}
