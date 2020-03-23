import { chakra, PropsOf, SystemProps } from "@chakra-ui/system"
import { getValidChildren } from "@chakra-ui/utils"
import * as React from "react"

export type BreadcrumbSeparatorProps = PropsOf<typeof chakra.div> & {
  spacing?: SystemProps["mx"]
}

export const BreadcrumbSeparator = React.forwardRef(
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

BreadcrumbSeparator.displayName = "BreadcrumbSeparator"

export type BreadcrumbLinkProps = PropsOf<typeof chakra.a> & {
  isCurrentPage?: boolean
}

export const BreadcrumbLink = React.forwardRef(
  ({ isCurrentPage, as, ...props }: BreadcrumbLinkProps, ref: React.Ref<any>) =>
    isCurrentPage ? (
      <chakra.span ref={ref} aria-current="page" {...props} />
    ) : (
      <chakra.a ref={ref} as={as} {...props} />
    ),
)

BreadcrumbLink.displayName = "BreadcrumbLink"

type BreadcrumbItemOptions = BreadcrumbProps & {
  isCurrentPage?: boolean
  isLastChild?: boolean
}

export type BreadcrumbItemProps = BreadcrumbItemOptions &
  PropsOf<typeof chakra.li>

export const BreadcrumbItem = React.forwardRef(
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

export const Breadcrumb = React.forwardRef(
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

    const clones = validChildren.map((child, index) => {
      if (!React.isValidElement(child)) return

      return React.cloneElement(child as React.ReactElement<any>, {
        addSeparator,
        separator,
        spacing,
        isLastChild: count === index + 1,
      })
    })

    return (
      <chakra.nav ref={ref} aria-label="breadcrumb" {...rest}>
        <chakra.ol>{clones}</chakra.ol>
      </chakra.nav>
    )
  },
)
