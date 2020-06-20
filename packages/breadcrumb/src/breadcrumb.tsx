import { chakra, forwardRef, PropsOf, SystemProps } from "@chakra-ui/system"
import { cx, getValidChildren, __DEV__ } from "@chakra-ui/utils"
import * as React from "react"

export type BreadcrumbSeparatorProps = PropsOf<typeof chakra.div> & {
  spacing?: SystemProps["mx"]
}

/**
 * React component that separates each breadcrumb link
 */
export const BreadcrumbSeparator = React.forwardRef(
  function BreadcrumbSeparator(
    props: BreadcrumbSeparatorProps,
    ref: React.Ref<any>,
  ) {
    const { spacing, ...rest } = props
    return <chakra.span ref={ref} role="presentation" mx={spacing} {...rest} />
  },
)

if (__DEV__) {
  BreadcrumbSeparator.displayName = "BreadcrumbSeparator"
}

interface LinkOptions {
  isCurrentPage?: boolean
}

export type BreadcrumbLinkProps = PropsOf<typeof chakra.a> & LinkOptions

const StyledLink = chakra("a", {
  themeKey: "Link",
})

/**
 * Breadcrumb link.
 *
 * It renders a `span` when it's the current link. Otherwise,
 * it renders an anchor tag.
 */
export const BreadcrumbLink = forwardRef<BreadcrumbLinkProps>(
  function BreadcrumbLink(props, ref) {
    const { isCurrentPage, as, className, ...rest } = props
    const _className = cx("chakra-breadcrumb__link", className)

    const sharedProps = {
      ref,
      as,
      className: _className,
      ...rest,
    }

    if (isCurrentPage) {
      return <chakra.span aria-current="page" {...sharedProps} />
    }

    return <StyledLink {...sharedProps} />
  },
)

if (__DEV__) {
  BreadcrumbLink.displayName = "BreadcrumbLink"
}

type BreadcrumbItemOptions = BreadcrumbProps & {
  isCurrentPage?: boolean
  /**
   * This is only used within the `cloneElement`
   * @private
   */
  isLastChild?: boolean
}

export type BreadcrumbItemProps = BreadcrumbItemOptions &
  PropsOf<typeof chakra.li>

/**
 * React component used to group a breadcrumb link
 *
 * It renders a `li` element to denote it belongs to an order list of links
 *
 * @see Docs https://chakra-ui.com/components/breadcrumbs
 */
export const BreadcrumbItem = forwardRef<BreadcrumbItemProps>(
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
        return React.cloneElement(child as React.ReactElement<any>, {
          isCurrentPage,
        })
      }

      if (child.type === BreadcrumbSeparator) {
        return React.cloneElement(child as React.ReactElement<any>, {
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
        display="inline-flex"
        alignItems="center"
        className={_className}
        {...rest}
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
  children?: React.ReactNode
  /**
   * The visual separator between each breadcrumb item
   */
  separator?: string | React.ReactElement
  /**
   * The left and right margin applied to the separator
   */
  spacing?: SystemProps["mx"]
}

export type BreadcrumbProps = PropsOf<typeof chakra.nav> & BreadcrumbOptions

/**
 * React component used to render a breadcrumb navigation landmark
 *
 * It renders a `nav` element with `aria-label` set to `Breadcrumb`
 *
 * @see Docs https://chakra-ui.com/components/breadcrumbs
 */
export const Breadcrumb = React.forwardRef(function Breadcrumb(
  props: BreadcrumbProps,
  ref: React.Ref<any>,
) {
  const {
    children,
    spacing = "0.5rem",
    separator = "/",
    className,
    ...rest
  } = props

  const validChildren = getValidChildren(children)
  const count = validChildren.length

  const clones = validChildren.map((child, index) =>
    React.cloneElement(child as React.ReactElement<any>, {
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
      <chakra.ol className="chakra-breadcrumb__list">{clones}</chakra.ol>
    </chakra.nav>
  )
})

if (__DEV__) {
  Breadcrumb.displayName = "Breadcrumb"
}
