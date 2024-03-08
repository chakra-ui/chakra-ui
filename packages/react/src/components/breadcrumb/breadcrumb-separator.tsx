import { cx } from "@chakra-ui/utils"
import { HTMLChakraProps, chakra, forwardRef } from "../../styled-system"
import { useBreadcrumbStyles } from "./breadcrumb-context"

export interface BreadcrumbSeparatorProps extends HTMLChakraProps<"li"> {}

const DefaultIcon = (props: HTMLChakraProps<"svg">) => (
  <chakra.svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="m9 18 6-6-6-6" />
  </chakra.svg>
)

export const BreadcrumbSeparator = forwardRef<BreadcrumbSeparatorProps, "li">(
  function BreadcrumbSeparator(props, ref) {
    const styles = useBreadcrumbStyles()

    return (
      <chakra.li
        ref={ref}
        {...props}
        css={[styles.separator, props.css]}
        className={cx("chakra-breadcrumb__separator", props.className)}
      >
        {props.children || <DefaultIcon />}
      </chakra.li>
    )
  },
)

BreadcrumbSeparator.displayName = "BreadcrumbSeparator"
