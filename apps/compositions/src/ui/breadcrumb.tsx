import {
  BreadcrumbList,
  Breadcrumb as ChakraBreadcrumb,
  type SystemStyleObject,
} from "@chakra-ui/react"
import { Children, Fragment, forwardRef, isValidElement } from "react"

export interface BreadcrumbRootProps extends ChakraBreadcrumb.RootProps {
  separator?: React.ReactNode
  separatorGap?: SystemStyleObject["gap"]
}

export const BreadcrumbRoot = forwardRef<HTMLDivElement, BreadcrumbRootProps>(
  function BreadcrumbRoot(props, ref) {
    const { separator, separatorGap, children, ...rest } = props
    const validChildren = Children.toArray(children).filter(isValidElement)
    return (
      <ChakraBreadcrumb.Root ref={ref} {...rest}>
        <BreadcrumbList gap={separatorGap}>
          {validChildren.map((child, index) => {
            const last = index === validChildren.length - 1
            return (
              <Fragment key={index}>
                <ChakraBreadcrumb.Item>{child}</ChakraBreadcrumb.Item>
                {!last && (
                  <ChakraBreadcrumb.Separator>
                    {separator}
                  </ChakraBreadcrumb.Separator>
                )}
              </Fragment>
            )
          })}
        </BreadcrumbList>
      </ChakraBreadcrumb.Root>
    )
  },
)

export const BreadcrumbLink = ChakraBreadcrumb.Link
export const BreadcrumbCurrentLink = ChakraBreadcrumb.CurrentLink
export const BreadcrumbEllipsis = ChakraBreadcrumb.Ellipsis
