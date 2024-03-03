import { cx } from "@chakra-ui/utils"
import {
  HTMLChakraProps,
  SystemRecipeProps,
  chakra,
  forwardRef,
  useSlotRecipe,
} from "../../styled-system"
import { BreadcrumbStylesProvider } from "./breadcrumb-context"

export interface BreadcrumbRootProps
  extends HTMLChakraProps<"nav">,
    SystemRecipeProps<"Breadcrumb"> {}

/**
 * Breadcrumb is used to render a breadcrumb navigation landmark.
 * It renders a `nav` element with `aria-label` set to `Breadcrumb`
 *
 * @see Docs https://chakra-ui.com/breadcrumb
 * @see WAI-ARIA https://www.w3.org/WAI/ARIA/apg/patterns/breadcrumb/
 */
export const BreadcrumbRoot = forwardRef<BreadcrumbRootProps, "nav">(
  function BreadcrumbRoot(props, ref) {
    const recipe = useSlotRecipe("Breadcrumb")
    const [variantProps, localProps] = recipe.splitVariantProps(props)
    const styles = recipe(variantProps)

    return (
      <chakra.nav
        ref={ref}
        aria-label="breadcrumb"
        {...localProps}
        className={cx("chakra-breadcrumb", props.className)}
        css={styles.root}
      >
        <BreadcrumbStylesProvider value={styles}>
          {localProps.children}
        </BreadcrumbStylesProvider>
      </chakra.nav>
    )
  },
)

BreadcrumbRoot.displayName = "Breadcrumb"
