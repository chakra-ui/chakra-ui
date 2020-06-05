import {
  chakra,
  PropsOf,
  SystemProps,
  ChakraComponent,
} from "@chakra-ui/system"
import { getValidChildren, __DEV__, cx } from "@chakra-ui/utils"
import * as React from "react"
import { cloneElement, forwardRef, Ref } from "react"

export type BreadcrumbSeparatorProps = PropsOf<typeof chakra.div> & {
  spacing?: SystemProps["mx"]
}

/**
 * React component that separates each breadcrumb link
 */
export const BreadcrumbSeparator = forwardRef(
  ({ spacing, ...props }: BreadcrumbSeparatorProps, ref: Ref<any>) => (
    <chakra.span ref={ref} role="presentation" mx={spacing} {...props} />
  ),
)

if (__DEV__) {
  BreadcrumbSeparator.displayName = "BreadcrumbSeparator"
}

type LinkOptions = { isCurrentPage?: boolean }

type LinkComp = ChakraComponent<"a">

export type BreadcrumbLinkProps = PropsOf<typeof chakra.a> & LinkOptions

const StyledLink = chakra("a", {
  themeKey: "Link",
})

/**
 * Breadcrumb link implementation.
 *
 * It renders a `span` when it's the current link. Otherwise,
 * it renders an anchor tag.
 */
function BreadcrumbLinkImpl(props: BreadcrumbLinkProps, ref: Ref<any>) {
  const { isCurrentPage, as, className, ...rest } = props

  const _className = cx("chakra-breadcrumb__link", className)

  const sharedProps = { ref, as, ...rest, className: _className }

  if (isCurrentPage) {
    return <chakra.span aria-current="page" {...sharedProps} />
  }

  return <StyledLink {...sharedProps} />
}

/**
 * React component that represent a single breadcrumb item's link.
 *
 * It also supports `as` prop which can be used to integrate
 * third-party routing libraries
 *
 * @example
 *
 * ```jsx
 *  <BreadcrumbLink as={Link} to="/home" replace>
 *     Breadcrumb 1
 *   </BreadcrumbLink>
 * ```
 *
 * @see Docs https://chakra-ui.com/breadcrumbs
 */
export const BreadcrumbLink = forwardRef(BreadcrumbLinkImpl) as LinkComp

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
 * @see Docs https://chakra-ui.com/breadcrumbs
 */
export const BreadcrumbItem = forwardRef(
  (props: BreadcrumbItemProps, ref: Ref<any>) => {
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
        return cloneElement(child as React.ReactElement<any>, {
          isCurrentPage,
        })
      }

      if (child.type === BreadcrumbSeparator) {
        return cloneElement(child as React.ReactElement<any>, {
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
 * @see Docs https://chakra-ui.com/breadcrumbs
 */
export const Breadcrumb = forwardRef(
  (props: BreadcrumbProps, ref: Ref<any>) => {
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
      cloneElement(child as React.ReactElement<any>, {
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
  },
)

if (__DEV__) {
  Breadcrumb.displayName = "Breadcrumb"
}
