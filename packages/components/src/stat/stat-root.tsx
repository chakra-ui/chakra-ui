import {
  defineStyle,
  omitThemingProps,
  ThemingProps,
} from "@chakra-ui/styled-system"
import { cx } from "@chakra-ui/utils/cx"
import {
  chakra,
  forwardRef,
  HTMLChakraProps,
  useMultiStyleConfig,
} from "../system"
import { StatStylesProvider } from "./stat-context"

export interface StatRootProps
  extends HTMLChakraProps<"div">,
    ThemingProps<"Stat"> {}

/**
 * The `Stat` component is used to display some statistics.
 *
 * @see Docs https://chakra-ui.com/docs/components/stat
 */
export const StatRoot = forwardRef<StatRootProps, "div">(
  function StatRoot(props, ref) {
    const styles = useMultiStyleConfig("Stat", props)

    const rootStyles = defineStyle({
      position: "relative",
      flex: "1 1 0%",
      ...styles.root,
    })

    const restProps = omitThemingProps(props)

    return (
      <StatStylesProvider value={styles}>
        <chakra.div
          ref={ref}
          {...restProps}
          className={cx("chakra-stat", restProps.className)}
          __css={rootStyles}
        >
          <dl>{restProps.children}</dl>
        </chakra.div>
      </StatStylesProvider>
    )
  },
)

StatRoot.displayName = "Stat"
