import { cx } from "@chakra-ui/utils"
import {
  HTMLChakraProps,
  SystemRecipeProps,
  chakra,
  forwardRef,
  useSlotRecipe,
} from "../../styled-system"
import { StatStylesProvider } from "./stat-context"

export interface StatRootProps
  extends HTMLChakraProps<"div">,
    SystemRecipeProps<"Stat"> {}

/**
 * The `Stat` component is used to display some statistics.
 *
 * @see Docs https://chakra-ui.com/docs/components/stat
 */
export const StatRoot = forwardRef<StatRootProps, "div">(
  function StatRoot(props, ref) {
    const recipe = useSlotRecipe("Stat")
    const [variantProps, localProps] = recipe.splitVariantProps(props)
    const styles = recipe(variantProps)

    return (
      <StatStylesProvider value={styles}>
        <chakra.div
          ref={ref}
          {...localProps}
          className={cx("chakra-stat", localProps.className)}
          css={styles.root}
        >
          <dl>{localProps.children}</dl>
        </chakra.div>
      </StatStylesProvider>
    )
  },
)

StatRoot.displayName = "Stat"
