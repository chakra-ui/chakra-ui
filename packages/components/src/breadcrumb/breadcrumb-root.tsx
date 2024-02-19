import { omitThemingProps, ThemingProps } from "@chakra-ui/styled-system"
import { cx } from "@chakra-ui/utils/cx"
import {
  chakra,
  forwardRef,
  HTMLChakraProps,
  useMultiStyleConfig,
} from "../system"
import { BreadcrumbStylesProvider } from "./breadcrumb-context"

export interface BreadcrumbRootProps
  extends HTMLChakraProps<"nav">,
    ThemingProps<"Breadcrumb"> {}

/**
 * Breadcrumb is used to render a breadcrumb navigation landmark.
 * It renders a `nav` element with `aria-label` set to `Breadcrumb`
 *
 * @see Docs https://chakra-ui.com/breadcrumb
 * @see WAI-ARIA https://www.w3.org/WAI/ARIA/apg/patterns/breadcrumb/
 */
export const BreadcrumbRoot = forwardRef<BreadcrumbRootProps, "nav">(
  function BreadcrumbRoot(props, ref) {
    const styles = useMultiStyleConfig("Breadcrumb", props)
    const ownProps = omitThemingProps(props)

    const { children, className, ...rest } = ownProps

    const _className = cx("chakra-breadcrumb", className)

    return (
      <chakra.nav
        ref={ref}
        aria-label="breadcrumb"
        className={_className}
        __css={styles.container}
        {...rest}
      >
        <BreadcrumbStylesProvider value={styles}>
          {children}
        </BreadcrumbStylesProvider>
      </chakra.nav>
    )
  },
)

BreadcrumbRoot.displayName = "Breadcrumb"
