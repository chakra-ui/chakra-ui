import {
  chakra,
  forwardRef,
  HTMLChakraProps,
  SystemStyleObject,
} from "@chakra-ui/system"
import { useBreadcrumbStyles } from "./breadcrumb-context"

export interface BreadcrumbSeparatorProps extends HTMLChakraProps<"div"> {
  /**
   * @type SystemStyleObject["mx"]
   */
  spacing?: SystemStyleObject["mx"]
}
/**
 * React component that separates each breadcrumb link
 */

export const BreadcrumbSeparator = forwardRef<BreadcrumbSeparatorProps, "span">(
  function BreadcrumbSeparator(props, ref) {
    const { spacing, ...rest } = props

    const styles = useBreadcrumbStyles()
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

BreadcrumbSeparator.displayName = "BreadcrumbSeparator"
