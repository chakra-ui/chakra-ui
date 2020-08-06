import {
  chakra,
  forwardRef,
  GetProps,
  omitThemingProps,
  StylesProvider,
  SystemProps,
  ThemingProps,
  useMultiStyleConfig,
  useStyles,
} from "@chakra-ui/system"
import { cx, getValidChildren, __DEV__ } from "@chakra-ui/utils"
import React, { cloneElement } from "react"

export interface BreadcrumbSeparatorProps extends GetProps<typeof chakra.div> {
  spacing?: SystemProps["mx"]
}

/**
 * React component that separates each breadcrumb link
 */
export const BreadcrumbSeparator = forwardRef<BreadcrumbSeparatorProps, "span">(
  function BreadcrumbSeparator(props, ref) {
    const { spacing, ...rest } = props

    const styles = useStyles()
    const separatorStyles = {
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

interface LinkOptions {
  isCurrentPage?: boolean
}

export interface BreadcrumbLinkProps
  extends GetProps<typeof chakra.a>,
    LinkOptions {}

/**
 * Breadcrumb link.
 *
 * It renders a `span` when it's the current link. Otherwise,
 * it renders an anchor tag.
 */
export const BreadcrumbLink = forwardRef<BreadcrumbLinkProps, "a">(
  function BreadcrumbLink(props, ref) {
    const { isCurrentPage, as, className, ...rest } = props
    const styles = useStyles()

    const sharedProps = {
      ref,
      as,
      className: cx("chakra-breadcrumb__link", className),
      ...rest,
    }

    if (isCurrentPage) {
      return <chakra.span aria-current="page" {...sharedProps} />
    }

    return <chakra.a __css={styles.link} {...sharedProps} />
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
    GetProps<typeof chakra.li> {}

/**
 * BreadcrumbItem is used to group a breadcrumb link.
 * It renders a `li` element to denote it belongs to an order list of links.
 *
 * @see Docs https://chakra-ui.com/components/breadcrumbs
 */
export const BreadcrumbItem = forwardRef<BreadcrumbItemProps, "li">(
  function BreadcrumbItem(props, ref) {
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
        return cloneElement(child, {
          isCurrentPage,
        })
      }

      if (child.type === BreadcrumbSeparator) {
        return cloneElement(child, {
          spacing,
          children: child.props.children || separator,
        })
      }

      return child
    })

    const _className = cx("chakra-breadcrumb__list-item", className)

    return (
      <chakra.li
        ref={ref}
        className={_className}
        {...rest}
        __css={{
          display: "inline-flex",
          alignItems: "center",
        }}
      >
        {clones}
        {!isLastChild && (
          <BreadcrumbSeparator spacing={spacing} children={separator} />
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
   */
  separator?: string | React.ReactElement
  /**
   * The left and right margin applied to the separator
   */
  spacing?: SystemProps["mx"]
}

export interface BreadcrumbProps
  extends GetProps<typeof chakra.nav>,
    BreadcrumbOptions,
    ThemingProps {}

/**
 * Breadcrumb is used to render a breadcrumb navigation landmark.
 * It renders a `nav` element with `aria-label` set to `Breadcrumb`
 *
 * @see Docs https://chakra-ui.com/components/breadcrumbs
 */
export const Breadcrumb = forwardRef<BreadcrumbProps, "nav">(
  function Breadcrumb(props, ref) {
    const styles = useMultiStyleConfig("Breadcrumb", props)
    const realProps = omitThemingProps(props)

    const {
      children,
      spacing = "0.5rem",
      separator = "/",
      className,
      ...rest
    } = realProps

    const validChildren = getValidChildren(children)
    const count = validChildren.length

    const clones = validChildren.map((child, index) =>
      cloneElement(child, {
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
        {...rest}
      >
        <StylesProvider value={styles}>
          <chakra.ol className="chakra-breadcrumb__list">{clones}</chakra.ol>
        </StylesProvider>
      </chakra.nav>
    )
  },
)

if (__DEV__) {
  Breadcrumb.displayName = "Breadcrumb"
}
