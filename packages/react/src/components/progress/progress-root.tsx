import { cx } from "@chakra-ui/utils"
import {
  HTMLChakraProps,
  SystemRecipeProps,
  chakra,
  forwardRef,
  useSlotRecipe,
} from "../../styled-system"
import {
  ProgressContextProvider,
  ProgressStylesProvider,
} from "./progress-context"
import { splitProgressProps } from "./progress-props"
import { ProgressOptions } from "./progress-types"
import { getProgressProps } from "./progress-utils"

export interface ProgressTrackProps extends HTMLChakraProps<"div"> {}

export interface ProgressRootProps
  extends ProgressOptions,
    SystemRecipeProps<"Progress">,
    HTMLChakraProps<"div"> {}

/**
 * Progress (Linear)
 *
 * Progress is used to display the progress status for a task that takes a long
 * time or consists of several steps.
 *
 * It includes accessible attributes to help assistive technologies understand
 * and speak the progress values.
 *
 * @see Docs https://chakra-ui.com/progress
 */
export const ProgressRoot = forwardRef<ProgressRootProps, "div">(
  function ProgressRoot(props, ref) {
    const recipe = useSlotRecipe("Progress")
    const [variantProps, localProps] = recipe.splitVariantProps(props)
    const styles = recipe(variantProps)

    const [progressProps, restProps] = splitProgressProps(localProps)
    const computed = getProgressProps(progressProps)

    return (
      <chakra.div
        ref={ref}
        {...restProps}
        css={styles.root}
        className={cx("chakra-progress", props.className)}
      >
        <ProgressStylesProvider value={styles}>
          <ProgressContextProvider value={{ computed, ...progressProps }}>
            {restProps.children}
          </ProgressContextProvider>
        </ProgressStylesProvider>
      </chakra.div>
    )
  },
)

ProgressRoot.displayName = "Progress"
