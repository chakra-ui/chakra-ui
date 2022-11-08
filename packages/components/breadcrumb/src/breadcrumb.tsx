import { cx } from "@chakra-ui/shared-utils"
import { getValidChildren } from "@chakra-ui/react-children-utils"
import {
  chakra,
  forwardRef,
  HTMLChakraProps,
  omitThemingProps,
  ThemingProps,
  useMultiStyleConfig,
} from "@chakra-ui/system"
import { cloneElement } from "react"
import { BreadcrumbStylesProvider } from "./breadcrumb-context"
import { BreadcrumbOptions } from "./breadcrumb-types"

export interface BreadcrumbProps
  extends HTMLChakraProps<"nav">,
    BreadcrumbOptions,
    ThemingProps<"Breadcrumb"> {
  listProps?: HTMLChakraProps<"ol">
}

/**
 * Breadcrumb is used to render a breadcrumb navigation landmark.
 * It renders a `nav` element with `aria-label` set to `Breadcrumb`
 *
 * @see Docs https://chakra-ui.com/breadcrumb
 * @see WAI-ARIA https://www.w3.org/WAI/ARIA/apg/patterns/breadcrumb/
 */
export const Breadcrumb = forwardRef<BreadcrumbProps, "nav">(
  function Breadcrumb(props, ref) {
    const styles = useMultiStyleConfig("Breadcrumb", props)
    const ownProps = omitThemingProps(props)

    const {
      children,
      spacing = "0.5rem",
      separator = "/",
      className,
      listProps,
      ...rest
    } = ownProps

    const validChildren = getValidChildren(children)
    const count = validChildren.length

    const clones = validChildren.map((child, index) =>
      cloneElement(child, {
        separator,
        spacing,
        isLastChild: count === index + 1,
      }),
    )

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
          <chakra.ol
            className="chakra-breadcrumb__list"
            {...listProps}
            __css={{
              display: "flex",
              alignItems: "center",
              ...styles.list,
            }}
          >
            {clones}
          </chakra.ol>
        </BreadcrumbStylesProvider>
      </chakra.nav>
    )
  },
)

Breadcrumb.displayName = "Breadcrumb"
