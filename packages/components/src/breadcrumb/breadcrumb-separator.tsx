import { SystemStyleObject, defineStyle } from "../styled-system"
import { HTMLChakraProps, chakra, forwardRef } from "../system"
import { useBreadcrumbStyles } from "./breadcrumb-context"

export interface BreadcrumbSeparatorProps extends HTMLChakraProps<"div"> {
  /**
   * @type SystemStyleObject["mx"]
   */
  spacing?: SystemStyleObject["mx"]
}

export const BreadcrumbSeparator = forwardRef<BreadcrumbSeparatorProps, "span">(
  function BreadcrumbSeparator(props, ref) {
    const { spacing, ...rest } = props

    const styles = useBreadcrumbStyles()
    const separatorStyles = defineStyle({
      mx: spacing,
      ...styles.separator,
    })

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

BreadcrumbSeparator.displayName = "BreadcrumbSeparator"
