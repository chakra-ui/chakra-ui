import { ThemingProps, omitThemingProps } from "@chakra-ui/styled-system"
import { cx } from "@chakra-ui/utils"
import {
  HTMLChakraProps,
  chakra,
  forwardRef,
  useMultiStyleConfig,
} from "../system"
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
    ThemingProps<"Progress">,
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
    const ownProps = omitThemingProps(props)
    const styles = useMultiStyleConfig("Progress", props)

    const [progressProps, restProps] = splitProgressProps(ownProps)
    const computed = getProgressProps(progressProps)

    return (
      <chakra.div
        ref={ref}
        {...restProps}
        __css={styles.root}
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
