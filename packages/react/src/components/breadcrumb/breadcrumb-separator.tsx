import {
  HTMLChakraProps,
  SystemStyleObject,
  chakra,
  defineStyle,
  forwardRef,
} from "../../styled-system"
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
        css={separatorStyles}
      />
    )
  },
)

BreadcrumbSeparator.displayName = "BreadcrumbSeparator"
