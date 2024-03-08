import { cx } from "@chakra-ui/utils"
import { HTMLChakraProps, chakra, forwardRef } from "../../styled-system"
import { useBreadcrumbStyles } from "./breadcrumb-context"

export interface BreadcrumbListProps extends HTMLChakraProps<"ol"> {}

export const BreadcrumbList = forwardRef<BreadcrumbListProps, "ol">(
  function BreadcrumbList(props, ref) {
    const styles = useBreadcrumbStyles()
    return (
      <chakra.ol
        {...props}
        ref={ref}
        className={cx("chakra-breadcrumb__list", props.className)}
        css={[styles.list, props.css]}
      />
    )
  },
)

BreadcrumbList.displayName = "BreadcrumbList"
