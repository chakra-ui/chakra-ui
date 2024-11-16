import { Breadcrumb, type SystemStyleObject } from "@chakra-ui/react"
import * as React from "react"

export interface BreadcrumbRootProps extends Breadcrumb.RootProps {
  separator?: React.ReactNode
  separatorGap?: SystemStyleObject["gap"]
}

export const BreadcrumbRoot = React.forwardRef<
  HTMLDivElement,
  BreadcrumbRootProps
>(function BreadcrumbRoot(props, ref) {
  const { separator, separatorGap, children, ...rest } = props

  const validChildren = React.Children.toArray(children).filter(
    React.isValidElement,
  )

  return (
    <Breadcrumb.Root ref={ref} {...rest}>
      <Breadcrumb.List gap={separatorGap}>
        {validChildren.map((child, index) => {
          const last = index === validChildren.length - 1
          return (
            <React.Fragment key={index}>
              <Breadcrumb.Item>{child}</Breadcrumb.Item>
              {!last && (
                <Breadcrumb.Separator>{separator}</Breadcrumb.Separator>
              )}
            </React.Fragment>
          )
        })}
      </Breadcrumb.List>
    </Breadcrumb.Root>
  )
})

export const BreadcrumbLink = Breadcrumb.Link
export const BreadcrumbCurrentLink = Breadcrumb.CurrentLink
export const BreadcrumbEllipsis = Breadcrumb.Ellipsis
