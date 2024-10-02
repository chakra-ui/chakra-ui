import {
  omitThemingProps,
  SystemStyleObject,
  ThemingProps,
} from "@chakra-ui/styled-system"
import { createContext, cx } from "@chakra-ui/utils"
import {
  chakra,
  forwardRef,
  HTMLChakraProps,
  useMultiStyleConfig,
} from "../system"

const [StatStylesProvider, useStatStyles] = createContext<
  Record<string, SystemStyleObject>
>({
  name: `StatStylesContext`,
  errorMessage: `useStatStyles returned is 'undefined'. Seems you forgot to wrap the components in "<Stat />" `,
})

export { useStatStyles }

export interface StatProps
  extends HTMLChakraProps<"div">,
    ThemingProps<"Stat"> {}

/**
 * The `Stat` component is used to display some statistics.
 *
 * @see Docs https://chakra-ui.com/docs/components/stat
 */
export const Stat = forwardRef<StatProps, "div">(function Stat(props, ref) {
  const styles = useMultiStyleConfig("Stat", props)
  const statStyles: SystemStyleObject = {
    position: "relative",
    flex: "1 1 0%",
    ...styles.container,
  }

  const { className, children, ...rest } = omitThemingProps(props)

  return (
    <StatStylesProvider value={styles}>
      <chakra.div
        ref={ref}
        {...rest}
        className={cx("chakra-stat", className)}
        __css={statStyles}
      >
        <dl>{children}</dl>
      </chakra.div>
    </StatStylesProvider>
  )
})

Stat.displayName = "Stat"
