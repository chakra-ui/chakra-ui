import { chakra, PropsOf, SystemProps } from "@chakra-ui/system"
import { getValidChildren, __DEV__ } from "@chakra-ui/utils"
import React, { cloneElement, forwardRef } from "react"

export type BreadcrumbSeparatorProps = PropsOf<typeof chakra.div> & {
  spacing?: SystemProps["mx"]
}

export const BreadcrumbSeparator = forwardRef(
  ({ spacing, ...props }: BreadcrumbSeparatorProps, ref: React.Ref<any>) => (
    <chakra.div
      ref={ref}
      role="presentation"
      as="span"
      mx={spacing}
      {...props}
    />
  ),
)

if (__DEV__) {
  BreadcrumbSeparator.displayName = "BreadcrumbSeparator"
}

export type BreadcrumbLinkProps = PropsOf<typeof chakra.a> & {
  isCurrentPage?: boolean
}

export const BreadcrumbLink = forwardRef(
  ({ isCurrentPage, as, ...props }: BreadcrumbLinkProps, ref: React.Ref<any>) =>
    isCurrentPage ? (
      <chakra.span ref={ref} aria-current="page" {...props} />
    ) : (
      <chakra.a ref={ref} as={as} {...props} />
    ),
)

if (__DEV__) {
  BreadcrumbLink.displayName = "BreadcrumbLink"
}

type BreadcrumbItemOptions = BreadcrumbProps & {
  isCurrentPage?: boolean
  isLastChild?: boolean
}

export type BreadcrumbItemProps = BreadcrumbItemOptions &
  PropsOf<typeof chakra.li>

export const BreadcrumbItem = forwardRef(
  (props: BreadcrumbItemProps, ref: React.Ref<any>) => {
    const {
      isCurrentPage,
      separator,
      isLastChild,
      addSeparator,
      spacing,
      children,
      ...rest
    } = props

    const validChildren = getValidChildren(children)

    const clones = validChildren.map(child => {
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

    return (
      <chakra.li ref={ref} display="inline-flex" alignItems="center" {...rest}>
        {clones}
        {!isLastChild && addSeparator && (
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
  separator?: string | React.ReactNode
  /**
   * If `true`, the breadcrumb will add the separator automatically
   */
  addSeparator?: boolean
  /**
   * The left and right margin applied to the separator
   */
  spacing?: SystemProps["mx"]
}

export type BreadcrumbProps = PropsOf<typeof chakra.nav> & BreadcrumbOptions

export const Breadcrumb = forwardRef(
  (props: BreadcrumbProps, ref: React.Ref<any>) => {
    const {
      children,
      spacing = 2,
      addSeparator = true,
      separator = "/",
      ...rest
    } = props

    const validChildren = getValidChildren(children)
    const count = validChildren.length

    const clones = validChildren.map((child, index) =>
      cloneElement(child as React.ReactElement<any>, {
        addSeparator,
        separator,
        spacing,
        isLastChild: count === index + 1,
      }),
    )

    return (
      <chakra.nav ref={ref} aria-label="breadcrumb" {...rest}>
        <chakra.ol>{clones}</chakra.ol>
      </chakra.nav>
    )
  },
)

if (__DEV__) {
  Breadcrumb.displayName = "Breadcrumb"
}
